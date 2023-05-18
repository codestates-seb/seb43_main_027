package codejejus.inddybuddy.like;

import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts/{post-id}")
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/like")
    public ResponseEntity<SingleResponse<LikeDto.Response>> createLike(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                       @RequestBody LikeDto.Request request,
                                                                       @PathVariable("post-id") Long postId) {
        return ResponseEntity.ok(new SingleResponse<>(likeService.createLike(memberPrincipal, request, postId)));
    }

    @DeleteMapping("/like/{like-id}")
    public ResponseEntity<Like> deleteLike(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                           @PathVariable("like-id") Long likeId) {
        likeService.deleteLike(memberPrincipal, likeId);
        return ResponseEntity.noContent().build();
    }
}
