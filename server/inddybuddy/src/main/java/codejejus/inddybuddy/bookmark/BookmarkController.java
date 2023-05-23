package codejejus.inddybuddy.bookmark;

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
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping("/bookmark")
    public ResponseEntity<SingleResponse<BookmarkDto.Response>> createReaction(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                               @PathVariable("post-id") @Valid @Positive Long postId,
                                                                               @RequestBody @Valid BookmarkDto.Request request) {
        return ResponseEntity.ok(new SingleResponse<>(bookmarkService.createBookmark(memberPrincipal, request, postId)));
    }

    @DeleteMapping("/unbookmark")
    public ResponseEntity<Bookmark> deleteReaction(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                   @PathVariable("post-id") @Valid @Positive Long postId) {
        bookmarkService.deleteBookmark(memberPrincipal, postId);
        return ResponseEntity.noContent().build();
    }
}
