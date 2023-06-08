package codejejus.inddybuddy.notification;

import codejejus.inddybuddy.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.time.LocalTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class AlarmEventListener {

    private final AlarmService alarmService;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @Async
    public void handleAlarmEvent(AlarmEvent event) throws InterruptedException {
        Thread.sleep(2000);
        Alarm alarm = event.getAlarm();
        Member receiver = alarm.getReceiver();
        log.info("receiver : {}", receiver.getEmail());
        Member sender = alarm.getSender();
        log.info("sender : {}", sender.getEmail());

        if (!receiver.equals(sender)) {
            log.info("handleAlarmEvent : [현재 시간 : {}] {}가 {}, {},  ", LocalTime.now(), alarm.getSender().getUsername(), alarm.getReceiver().getUsername(), alarm.getContent());
            alarmService.send(alarm);
        }
    }
}
