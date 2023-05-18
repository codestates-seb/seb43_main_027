package codejejus.inddybuddy.like;

import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
import codejejus.inddybuddy.post.Post;
import codejejus.inddybuddy.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final LikeMapper likeMapper;
    private final MemberService memberService;
    private final PostService postService;

    public LikeDto.Response createLike(MemberPrincipal memberPrincipal, LikeDto.Request request, Long postId) {
        Member member = memberService.findMember(memberPrincipal.getMember().getMemberId());
        Post post = postService.findVerifidPost(postId);
        Like like = likeMapper.dtoToEntity(request);
        like.update(member, post);
        verifyExistLike(member, post);
        Like save = likeRepository.save(like);
        return likeMapper.entityToResponse(save);
    }

    public void deleteLike(MemberPrincipal memberPrincipal, Long postId) {
        Member member = memberService.findMember(memberPrincipal.getMember().getMemberId());
        Post post = postService.findVerifidPost(postId);
        Like findLike = findVerifiedLike(member, post);
        memberService.verifySameMember(memberPrincipal.getMember(), findLike.getMember());
        likeRepository.delete(findLike);
    }

    private void verifyExistLike(Member member, Post post) {
        Optional<Like> optionalLike = likeRepository.findByMemberAndPost(member, post);
        if (optionalLike.isPresent()) {
            throw new CustomException(ExceptionCode.ALREADY_EXIST_LIKE);
        }
    }

    private Like findVerifiedLike(Member member, Post post) {
        return likeRepository.findByMemberAndPost(member, post)
                .orElseThrow(() -> new CustomException(ExceptionCode.LIKE_NOT_FOUND));
    }
}
