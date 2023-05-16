package codejejus.inddybuddy.message;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class MessageDto {

    @Getter
    static class Request {

        private String content;
    }

    @Builder
    @Getter
    static class Response {

        private Long senderId;
        private String content;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime createdAt;
    }
}
