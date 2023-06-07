package codejejus.inddybuddy.email;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class EmailSendApplicationEvent extends ApplicationEvent {

    private String email;
    private String code;

    public EmailSendApplicationEvent(Object source, String email, String code) {
        super(source);
        this.email = email;
        this.code = code;
    }
}
