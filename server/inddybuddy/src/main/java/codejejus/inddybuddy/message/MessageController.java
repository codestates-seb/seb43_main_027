package codejejus.inddybuddy.message;

import codejejus.inddybuddy.global.dto.MultiResponse;
import codejejus.inddybuddy.global.utils.UriCreator;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping("/{member-id}")
    public ResponseEntity<?> postMessage(@PathVariable("member-id") @Valid @Positive Long receiverId,
                                         @AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                         @RequestBody @Valid MessageDto.Request request) {
        messageService.sendMessage(request, memberPrincipal, receiverId);
        return ResponseEntity.created(UriCreator.createURI(receiverId)).build();
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<MultiResponse<MessageDto.Response>> getMessages(@PathVariable("member-id") @Valid @Positive Long receiverId,
                                                                          @AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                                          @PageableDefault(page = 1, size = 30) Pageable pageable) {
        Page<MessageDto.Response> responsePage = messageService.findSendMessages(memberPrincipal, receiverId, pageable);
        List<MessageDto.Response> responses = responsePage.getContent().stream()
                .sorted(Comparator.comparing(MessageDto.Response::getCreatedAt))
                .collect(Collectors.toList());
        return ResponseEntity.ok(new MultiResponse<>(responses, responsePage));
    }
}
