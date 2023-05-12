package codejejus.inddybuddy.post;

import codejejus.inddybuddy.game.GameService;
import codejejus.inddybuddy.global.constant.Filter;
import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public PostDto.Response createPost(MemberPrincipal memberPrincipal, PostDto.Request requestDto) {  // 단순한 생성 방식
        Post post = postMapper.requestToEntity(requestDto);
        post.setPostTag(requestDto.getPostTag());
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

    public PostDto.Response findPost(Long postId) {
        Post post = findVerifidPost(postId);
        return postMapper.entityToResponse(post);
    }

    public Page<PostDto.Response> getAllPosts(Pageable pageable, Post.PostTag postTag, Filter filter) {
        Page<Post> posts;

        if(postTag == null) {
            posts = postRepository.findAll(pageable);
        } else{
            if (filter == null) {
                posts = postRepository.findAllByPostTag(postTag, pageable);
            } else if (filter.equals(Filter.NEW)) {
                posts = postRepository.findAllByPostTagOrderByCreatedAtDesc(postTag, pageable);
            } else if (filter.equals(Filter.MOST_VIEWS)) {
                posts = postRepository.findAllByPostTagOrderByViewsDesc(postTag, pageable);
            } else if (filter.equals(Filter.LIKE)) {
                posts = postRepository.findAllByPostTagOrderByLikesDesc(postTag, pageable);
            } else {
                throw new CustomException(ExceptionCode.FILTER_NOT_FOUND);
            }
        }


        return postMapper.entityPageToResponsePage(posts);
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
