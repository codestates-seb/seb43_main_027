package codejejus.inddybuddy.notification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.time.LocalTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class AlarmEventListener {

    private final AlarmService alarmService;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleAlarmEvent(AlarmEvent event) throws InterruptedException {
        Alarm alarm = event.getAlarm();
        if (!alarm.getReceiver().equals(alarm.getSender())) {
            log.info("handleAlarmEvent : [현재 시간 : {}] {}가 {}에게 {}를 보냈습니다.,  ", LocalTime.now(), alarm.getSender().getUsername(), alarm.getReceiver().getUsername(), alarm.getAlarmType().getName());
            Thread.sleep(2000L);
            alarmService.send(alarm);
        }
    }
}
