package codejejus.inddybuddy.reaction;

import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts/{post-id}")
public class ReactionController {

    private final ReactionService reactionService;

    @PostMapping("/reaction")
    public ResponseEntity<SingleResponse<ReactionDto.Response>> createReaction(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                               @PathVariable("post-id") @Valid @Positive Long postId,
                                                                               @RequestBody @Valid ReactionDto.Request request) {
        return ResponseEntity.ok(new SingleResponse<>(reactionService.createReaction(memberPrincipal, request, postId)));
    }

    @DeleteMapping("/unreaction")
    public ResponseEntity<Reaction> deleteReaction(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                   @PathVariable("post-id") @Valid @Positive Long postId) {
        reactionService.deleteReaction(memberPrincipal, postId);
        return ResponseEntity.noContent().build();
    }
}
