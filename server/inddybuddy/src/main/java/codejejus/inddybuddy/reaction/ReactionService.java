package codejejus.inddybuddy.reaction;

import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
import codejejus.inddybuddy.post.Post;
import codejejus.inddybuddy.post.PostRepository;
import codejejus.inddybuddy.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReactionService {

    private final ReactionRepository reactionRepository;
    private final PostRepository postRepository;
    private final ReactionMapper reactionMapper;
    private final MemberService memberService;

    public ReactionDto.Response createReaction(MemberPrincipal memberPrincipal, ReactionDto.Request request, Long postId) {
        Member member = memberService.findMember(memberPrincipal.getMember().getMemberId());
        Post post = findVerifidPost(postId);
        Reaction reaction = reactionMapper.dtoToEntity(request);
        reaction.update(member, post);
        verifyExistReaction(member, post);
        Reaction save = reactionRepository.save(reaction);
        return reactionMapper.entityToResponse(save);
    }

    public void deleteReaction(MemberPrincipal memberPrincipal, Long postId) {
        Member member = memberService.findMember(memberPrincipal.getMember().getMemberId());
        Post post = findVerifidPost(postId);
        Reaction findReaction = findVerifiedReaction(member, post);
        memberService.verifySameMember(memberPrincipal.getMember(), findReaction.getMember());
        reactionRepository.delete(findReaction);
    }

    public ReactionDto.Response findReaction(Member member, Post post) {
        Optional<Reaction> optionalReaction = reactionRepository.findByMemberAndPost(member, post);
        if (optionalReaction.isEmpty()) return null;
        Reaction reaction = optionalReaction.get();
        return reactionMapper.entityToResponse(reaction);
    }

    private Post findVerifidPost(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElseThrow(() -> new CustomException(ExceptionCode.POST_NOT_FOUND));
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
