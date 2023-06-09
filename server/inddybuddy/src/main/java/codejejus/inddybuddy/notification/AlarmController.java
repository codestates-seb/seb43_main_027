package codejejus.inddybuddy.notification;

import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                @RequestHeader(value = "lastEventId", required = false, defaultValue = "") String lastEventId) {
        return alarmService.subscribe(memberPrincipal.getMember().getMemberId(), lastEventId);
    }

    @PatchMapping("/alarm")
    public void readNotification(@RequestBody AlarmDto.Request request) {
        alarmService.readAlarm(request);
    }

    @GetMapping(value = "/alarm/unread", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SingleResponse<List<AlarmDto.BaseResponse>>> getUnreadAlarms(@AuthenticationPrincipal MemberPrincipal memberPrincipal) {
        List<AlarmDto.BaseResponse> responses = alarmService.sendUnReadNotification(memberPrincipal.getMember().getMemberId());
        return ResponseEntity.ok(new SingleResponse<>(responses));
    }
}
