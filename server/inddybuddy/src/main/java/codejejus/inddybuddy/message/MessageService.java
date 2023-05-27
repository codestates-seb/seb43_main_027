package codejejus.inddybuddy.message;

import codejejus.inddybuddy.global.constant.Filter;
import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
import codejejus.inddybuddy.notification.Alarm;
import codejejus.inddybuddy.notification.AlarmEvent;
import codejejus.inddybuddy.notification.AlarmType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MessageService {

    private final MessageRepository messageRepository;
    private final MemberService memberService;
    private final MessageMapper messageMapper;
    private final ApplicationEventPublisher eventPublisher;

    public void sendMessage(MessageDto.Request request, MemberPrincipal memberPrincipal, Long receiverId) {
        Member receiver = memberService.findMember(receiverId);
        Member sender = memberPrincipal.getMember();
        verifySender(receiver, sender);

        Message message = messageMapper.toEntity(request, sender, receiver);
        messageRepository.save(message);

        String content = sender.getUsername() + "님이 [" + request.getContent() + "] 메세지를 보냈습니다.";
        Alarm alarm = Alarm.builder()
                .receiver(receiver)
                .sender(sender)
                .alarmType(AlarmType.MESSAGE)
                .content(content)
                .build();
        eventPublisher.publishEvent(new AlarmEvent(this, alarm));
    }

    public Page<MessageDto.Response> findSendMessages(MemberPrincipal memberPrincipal, Long receiverId, Pageable pageable) {
        Member receiver = memberService.findMember(receiverId);
        Member sender = memberPrincipal.getMember();
        verifySender(receiver, sender);

        Page<Message> messages = messageRepository.findAllMessages(sender, receiver, PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), Filter.getMatchedSort("new")));
        return messageMapper.entityToResponses(messages);
    }

    public List<MessageDto.MemberResponse> findAllByMessageMembers(Member member) {
        Set<Message> messages = messageRepository.findAllByMessageMembers(member);
        return messages.stream()
                .map(MessageDto.MemberResponse::new)
                .collect(Collectors.toList());
    }

    private void verifySender(Member receiver, Member sender) {
        if (sender.getEmail().equals(receiver.getEmail())) {
            throw new CustomException(ExceptionCode.NEED_DIFFERENT_MEMBER);
        }
    }
}
