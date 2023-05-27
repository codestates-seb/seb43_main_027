package codejejus.inddybuddy.notification;

import codejejus.inddybuddy.global.utils.LocalDateTimeSerializer;
import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.post.PostDto;
import lombok.Getter;

public class AlarmDto {

    @Getter
    public static class Request {

        private String[] id;
    }

    @Getter
    public static class BaseResponse {

        private final Long notificationId;
        private final String content;
        private final MemberDto.BaseResponse receiver;
        private final MemberDto.BaseResponse sender;
        private final AlarmType alarmType;
        private final String createdAt;

        public BaseResponse(Alarm alarm) {
            this.notificationId = alarm.getAlarmId();
            this.sender = new MemberDto.BaseResponse(alarm.getSender());
            this.receiver = new MemberDto.BaseResponse(alarm.getReceiver());
            this.content = alarm.getContent();
            this.alarmType = alarm.getAlarmType();
            this.createdAt = LocalDateTimeSerializer.toString(alarm.getCreatedAt());
        }
    }

    @Getter
    public static class PostResponse extends BaseResponse {

        private final PostDto.SimpleResponse post;

        public PostResponse(Alarm alarm) {
            super(alarm);
            this.post = new PostDto.SimpleResponse(alarm.getPost());
        }
    }

    @Getter
    public static class CommentResponse extends PostResponse {

        private final Long originCommentId;
        private final Long subCommentId;

        public CommentResponse(Alarm alarm) {
            super(alarm);
            this.originCommentId = alarm.getComment().getCommentId();
            this.subCommentId = alarm.getComment().getParentCommentId();
        }
    }
}
