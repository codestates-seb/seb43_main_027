package codejejus.inddybuddy.comment;

import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.global.utils.UriCreator;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/posts/{post-id}/comments")
@Validated
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<SingleResponse<CommentDto.Response>> createComment(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                             @PathVariable("post-id") @Valid @Positive Long postId,
                                                                             @RequestBody @Valid CommentDto.Request requestDto) {
        CommentDto.Response commentResponse = commentService.createComment(memberPrincipal, requestDto, postId);
        SingleResponse<CommentDto.Response> singleResponse = new SingleResponse<>(commentResponse);
        return ResponseEntity.created(UriCreator.createURI(commentResponse.getCommentId())).body(singleResponse);
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity<SingleResponse<CommentDto.Response>> getComment(@PathVariable("comment-id") @Valid @Positive Long commentId) {
        return ResponseEntity.ok(new SingleResponse<>(commentService.getComment(commentId)));
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity<SingleResponse<CommentDto.Response>> modifyComment(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                             @PathVariable("comment-id") @Valid @Positive Long commentId,
                                                                             @RequestBody @Valid CommentDto.Request requestDto) {
        return ResponseEntity.ok(new SingleResponse<>(commentService.modifyComment(commentId, memberPrincipal, requestDto)));
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity<Comment> deletePost(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                              @PathVariable("comment-id") @Valid @Positive Long commentId) {
        commentService.deleteComment(commentId, memberPrincipal);
        return ResponseEntity.noContent().build();
    }
}
