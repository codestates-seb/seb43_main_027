package codejejus.inddybuddy.reaction;

import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts/{post-id}")
public class ReactionController {

    private final ReactionService reactionService;

    @PostMapping("/reaction")
    public ResponseEntity<SingleResponse<ReactionDto.Response>> createReaction(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                               @RequestBody ReactionDto.Request request,
                                                                               @PathVariable("post-id") Long postId) {
        return ResponseEntity.ok(new SingleResponse<>(reactionService.createReaction(memberPrincipal, request, postId)));
    }

    @DeleteMapping("/unreaction")
    public ResponseEntity<Reaction> deleteReaction(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                   @PathVariable("post-id") Long postId) {
        reactionService.deleteReaction(memberPrincipal, postId);
        return ResponseEntity.noContent().build();
    }
}
