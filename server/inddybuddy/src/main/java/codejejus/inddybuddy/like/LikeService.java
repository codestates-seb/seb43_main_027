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
        verifyLike(member, post);
        Like save = likeRepository.save(like);
        return likeMapper.entityToResponse(save);
    }

    public void deleteLike(MemberPrincipal memberPrincipal, Long likeId) {
        Like findLike = findVerifiedLike(likeId);
        memberService.verifySameMember(memberPrincipal.getMember(), findLike.getMember());
        likeRepository.deleteById(likeId);
    }


    private void verifyLike(Member member, Post post) {
        boolean isExist = likeRepository.existsByMemberAndPost(member, post);
        if (isExist) throw new CustomException(ExceptionCode.ALREADY_EXIST_LIKE);
    }

    private Like findVerifiedLike(Long likeId) {
        Optional<Like> optionalLike = likeRepository.findById(likeId);
        Like findLike = optionalLike.orElseThrow(() -> new CustomException(ExceptionCode.LIKE_NOT_FOUND));
        return findLike;
    }
}
