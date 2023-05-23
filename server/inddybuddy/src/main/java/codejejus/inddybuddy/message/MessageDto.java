package codejejus.inddybuddy.message;

import codejejus.inddybuddy.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class MessageDto {

    @Getter
    static class Request {

        @NotBlank
        private String content;
    }

    @Builder
    @Getter
    static class Response {

        private final Long senderId;
        private final String content;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
        private final LocalDateTime createdAt;
    }

    @Getter
    public static class MemberResponse {

        private final Member sender;
        private final Member receiver;

        public MemberResponse(Message message) {
            this.sender = message.getSender();
            this.receiver = message.getReceiver();
        }
    }
}
