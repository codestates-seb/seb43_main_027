package codejejus.inddybuddy.reaction;

import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
import codejejus.inddybuddy.notification.Alarm;
import codejejus.inddybuddy.notification.AlarmEvent;
import codejejus.inddybuddy.notification.AlarmType;
import codejejus.inddybuddy.post.Post;
import codejejus.inddybuddy.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReactionService {

    private final ReactionRepository reactionRepository;
    private final PostService postService;
    private final ReactionMapper reactionMapper;
    private final MemberService memberService;
    private final ApplicationEventPublisher eventPublisher;

    public ReactionDto.Response createReaction(MemberPrincipal memberPrincipal, ReactionDto.Request request, Long postId) {
        Member member = memberService.findMember(memberPrincipal.getMember().getMemberId());
        Post post = postService.findVerifidPost(postId);
        Member receiver = post.getMember();
        Reaction reaction = reactionMapper.dtoToEntity(request);
        reaction.update(member, post);
        verifyExistReaction(member, post);
        Reaction save = reactionRepository.save(reaction);

        String content = member.getUsername() + "님이 회원님의 게시물에 " + request.getReactionStatus() + " 하였습니다.";
        Alarm alarm = Alarm.builder()
                .alarmType(AlarmType.POST_LIKE)
                .post(post)
                .sender(member)
                .receiver(receiver)
                .content(content)
                .build();
        eventPublisher.publishEvent(new AlarmEvent(this, alarm));
        return reactionMapper.entityToResponse(save);
    }

    public void deleteReaction(MemberPrincipal memberPrincipal, Long postId) {
        Member member = memberService.findMember(memberPrincipal.getMember().getMemberId());
        Post post = postService.findVerifidPost(postId);
        Reaction findReaction = findVerifiedReaction(member, post);
        memberService.verifySameMember(memberPrincipal.getMember(), findReaction.getMember());
        reactionRepository.delete(findReaction);
    }

    private void verifyExistReaction(Member member, Post post) {
        Optional<Reaction> optionalReaction = reactionRepository.findByMemberAndPost(member, post);
        if (optionalReaction.isPresent()) {
            throw new CustomException(ExceptionCode.ALREADY_EXIST_REACTION);
        }
    }

    private Reaction findVerifiedReaction(Member member, Post post) {
        return reactionRepository.findByMemberAndPost(member, post)
                .orElseThrow(() -> new CustomException(ExceptionCode.REACTION_NOT_FOUND));
    }
}
