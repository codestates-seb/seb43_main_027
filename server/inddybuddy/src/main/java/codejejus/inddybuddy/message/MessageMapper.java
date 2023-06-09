package codejejus.inddybuddy.message;

import codejejus.inddybuddy.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MessageMapper {

    public Message toEntity(MessageDto.Request request, Member sender, Member receiver) {
        return Message.builder()
                .receiver(receiver)
                .sender(sender)
                .content(request.getContent())
                .build();
    }

    public Page<MessageDto.Response> entityToResponses(Page<Message> messages) {
        return messages.map(this::entityToResponse);
    }

    public MessageDto.Response entityToResponse(Message message) {
        return MessageDto.Response
                .builder()
                .content(message.getContent())
                .senderId(message.getSender().getMemberId())
                .createdAt(message.getCreatedAt())
                .build();
    }
}
