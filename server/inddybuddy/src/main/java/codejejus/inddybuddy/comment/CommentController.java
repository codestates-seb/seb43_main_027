package codejejus.inddybuddy.comment;

import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.global.utils.UriCreator;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import codejejus.inddybuddy.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/posts/{post-id}/comments")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentDto.Response> createComment(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                             @RequestBody CommentDto.Request requestDto,
                                                             @PathVariable("post-id") Long postId) {
        CommentDto.Response commentResponse = commentService.createComment(memberPrincipal, requestDto, postId);
        return ResponseEntity.created(UriCreator.createURI(commentResponse.getCommentId())).build();
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity<SingleResponse<CommentDto.Response>> modifyComment(@PathVariable("comment-id") Long commentId,
                                                                             @AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                             @RequestBody CommentDto.Request requestDto) {
        return ResponseEntity.ok(new SingleResponse<>(commentService.modifyComment(commentId, memberPrincipal, requestDto)));
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity<Comment> deletePost(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                              @PathVariable("comment-id") Long commentId) {
        commentService.deleteComment(commentId, memberPrincipal);
        return ResponseEntity.noContent().build();
    }
}
