package codejejus.inddybuddy.post;

import codejejus.inddybuddy.global.dto.MultiResponse;
import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @PatchMapping("/{post-id}")
    public ResponseEntity<SingleResponse<PostDto.Response>> modifyPost(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                       @PathVariable("post-id") @Valid @Positive Long postId,
                                                                       @RequestPart PostDto.Patch patch,
                                                                       @RequestPart(value = "files", required = false) List<MultipartFile> multipartFiles) {
        return ResponseEntity.ok(new SingleResponse<>(postService.modifyPost(postId, memberPrincipal, patch, multipartFiles)));
    }

    @GetMapping("/{post-id}")
    public ResponseEntity<SingleResponse<PostDto.Response>> findPost(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                     @PathVariable("post-id") @Valid @Positive Long postId) {
        return ResponseEntity.ok(new SingleResponse<>(postService.findPost(postId, memberPrincipal)));
    }

    @GetMapping("/search")
    public ResponseEntity<MultiResponse<PostDto.SimpleResponse>> searchPostsByKeyword(@RequestParam(value = "q") String keyword,
                                                                                      @PageableDefault(page = 1, size = 30) Pageable pageable) {
        Page<PostDto.SimpleResponse> responsePage = postService.getPostsByKeyword(pageable, keyword);
        List<PostDto.SimpleResponse> responses = responsePage.getContent();
        return ResponseEntity.ok(new MultiResponse<>(responses, responsePage));
    }

    @DeleteMapping("/{post-id}")
    public ResponseEntity<Post> deletePost(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                           @PathVariable("post-id") @Valid @Positive Long postId) {
        postService.deletePost(postId, memberPrincipal);
        return ResponseEntity.noContent().build();
    }
}
