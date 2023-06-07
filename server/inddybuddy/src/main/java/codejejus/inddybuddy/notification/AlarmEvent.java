package codejejus.inddybuddy.notification;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEvent;

@Getter
@Slf4j
public class AlarmEvent extends ApplicationEvent {

    private final Alarm alarm;

    public AlarmEvent(Object source, Alarm alarm) {
        super(source);
        this.alarm = alarm;
    }
}
