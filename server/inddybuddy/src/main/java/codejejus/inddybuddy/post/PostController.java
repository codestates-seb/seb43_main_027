package codejejus.inddybuddy.post;

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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/games/{game-id}/posts")
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<PostDto.Response> createPost(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                       @RequestPart PostDto.Request post,
                                                       @PathVariable("game-id") Long gameId,
                                                       @RequestPart(value = "files", required = false) List<MultipartFile> multipartFiles) {
        post.addGameId(gameId);
        PostDto.Response PostResponse = postService.createPost(memberPrincipal, post, multipartFiles);
        URI uri = UriCreator.createURI(PostResponse.getPostId());

        return ResponseEntity.created(uri).build();
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity<SingleResponse<PostDto.Response>> modifyPost(@PathVariable("post-id") Long postId,
                                                                       @AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                       @RequestPart PostDto.Request patch,
                                                                       @RequestPart(value = "files", required = false) List<MultipartFile> multipartFiles) {
        return ResponseEntity.ok(new SingleResponse<>(postService.modifyPost(postId, memberPrincipal, patch, multipartFiles)));
    }

    @GetMapping("/{post-id}")
    public ResponseEntity<PostDto.Response> findPost(@PathVariable("post-id") Long postId) {
        return ResponseEntity.ok(postService.findPost(postId));
    }

    @GetMapping
    public ResponseEntity<MultiResponse<PostDto.Response>> getAllPosts(@PageableDefault(page = 0, size = 20) Pageable pageable,
                                                                       @RequestParam(required = false) Post.PostTag postTag,
                                                                       @RequestParam(required = false) Filter filter) {
        Page<PostDto.Response> pagePosts = postService.getAllPosts(pageable, postTag, filter);
        List<PostDto.Response> posts = pagePosts.getContent();
        return ResponseEntity.ok(new MultiResponse<>(posts, pagePosts));
    }

    @DeleteMapping("/{post-id}")
    public ResponseEntity<Post> deletePost(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                           @PathVariable("post-id") Long postId) {
        postService.deletePost(postId, memberPrincipal);
        return ResponseEntity.noContent().build();
    }
}
