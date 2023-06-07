package codejejus.inddybuddy.notification;

import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

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
}
