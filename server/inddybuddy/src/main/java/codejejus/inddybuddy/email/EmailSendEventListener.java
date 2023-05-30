package codejejus.inddybuddy.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.Timer;
import java.util.TimerTask;

@RequiredArgsConstructor
@Component
@Slf4j
public class EmailSendEventListener {

    @Async
    @EventListener
    public void listen(EmailSendApplicationEvent event) {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                EmailService.codeStorage.remove(event.getEmail());
                timer.cancel();
                System.out.println("3분 지남. 자동 삭제");
                System.out.println(EmailService.codeStorage);
            }
        }, 3 * 60 * 1000);
    }
}
