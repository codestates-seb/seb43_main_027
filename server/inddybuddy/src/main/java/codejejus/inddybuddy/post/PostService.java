package codejejus.inddybuddy.post;

import codejejus.inddybuddy.game.GameService;
import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {

    private final PostRepository postRepository;
    private final MemberService memberService;
    private final GameService gameService;
    private final PostMapper postMapper;

    // 멤버 서비스에서 멤버프린시펄로 받아온 값
    // 포스트할 때 멤버 아이디 들어오는데 정보

    public PostDto.Response createPost(MemberPrincipal memberPrincipal, PostDto.Request requestDto) {  // 단순한 생성 방식
        Post post = postMapper.requestToEntity(requestDto);
        // 게임 선택, 멤버 검증
        post.setGame(gameService.findGame(requestDto.getGameId()));
        post.setMember(memberPrincipal.getMember());
        Post save = postRepository.save(post);
        return postMapper.entityToResponse(save);
    }

    public PostDto.Response modifyPost(Long postId, MemberPrincipal memberPrincipal, PostDto.Request requestDto) {
        Post findPost = findVerifidPost(postId);
        memberService.verifySameMember(findPost.getMember(), memberPrincipal.getMember()); // 회원 검증
        // Todo : 이미지 리스트, 파일 리스트 추가 필요
        findPost.updatePost(requestDto.getTitle(), requestDto.getContent(), requestDto.getPostTag());
        return postMapper.entityToResponse(findPost);
    }
    // Todo : 댓글 구현 후, 게시글 삭제 시 댓글까지 삭제 구현하기
    public PostDto.Response deletePost(Long postId, MemberPrincipal memberPrincipal) {
        Post findPost = findVerifidPost(postId);
        memberService.verifySameMember(findPost.getMember(), memberPrincipal.getMember());
        findPost.updatePostStatus(Post.PostStatus.POST_DELETED);
        postRepository.save(findPost);
        return postMapper.entityToResponse(findPost);
    }
    private void verifyPost(Post post) {
        Long memberId = post.getMember().getMemberId();
        memberService.findMember(memberId);
    }
    private Post findVerifidPost(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElseThrow(() -> new CustomException(ExceptionCode.POST_NOT_FOUND));
    }
}
