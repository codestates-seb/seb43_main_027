package codejejus.inddybuddy.post;

import codejejus.inddybuddy.game.GameDto;
import codejejus.inddybuddy.global.constant.Filter;
import codejejus.inddybuddy.global.dto.MultiResponse;
import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.global.utils.UriCreator;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/games/{game-id}/posts")
public class PostController {

    private final PostService postService;
    private final PostMapper postMapper;


    // Mapper를 클래스, 엔티티에 builder 생성시
    @PostMapping
    public ResponseEntity<PostDto.Response> createPost(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                        @RequestBody PostDto.Request requestDto,
                                        @PathVariable("game-id") Long gameId) {
        // Todo : 게임을 선택하고 그 안에 post를 만든다.
        requestDto.addGameId(gameId);
        PostDto.Response PostResponse = postService.createPost(memberPrincipal, requestDto);
        URI uri = UriCreator.createURI(PostResponse.getPostId());

        return ResponseEntity.created(uri).build();
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity<SingleResponse<PostDto.Response>> modifyPost(@PathVariable("post-id") Long postId,
                                                       @AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                       @RequestBody PostDto.Request requestDto) {
        return ResponseEntity.ok(new SingleResponse<>(postService.modifyPost(postId, memberPrincipal, requestDto)));
    }

    // Todo : postTag 적용
    @GetMapping
    public ResponseEntity<MultiResponse<PostDto.Response>> getAllPosts(@PageableDefault(page = 0, size = 20)Pageable pageable,
                                                                       @RequestParam(required = false)Post.PostTag postTag,
                                                                       @RequestParam(required = false)Filter filter) {
        Page<PostDto.Response> pagePosts = postService.getAllPosts(pageable, postTag, filter);
        List<PostDto.Response> posts = pagePosts.getContent(); // 필요한지 검증
        return ResponseEntity.ok(new MultiResponse<>(posts, pagePosts));
    }


    // Todo : 댓글 구현 후, 게시글 삭제 시 댓글까지 삭제 구현하기
    @DeleteMapping("/{post-id}")
    public ResponseEntity<Post> deletePost(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                           @PathVariable("post-id") Long postId) {
        postService.deletePost(postId, memberPrincipal);
        return ResponseEntity.noContent().build();
    }
}
