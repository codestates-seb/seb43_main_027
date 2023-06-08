package codejejus.inddybuddy.notification;

import codejejus.inddybuddy.global.utils.LocalDateTimeSerializer;
import codejejus.inddybuddy.member.dto.MemberDto;
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
        private final MemberDto.BaseResponse sender;
        private final AlarmType alarmType;
        private final String createdAt;

        public BaseResponse(Alarm alarm) {
            this.notificationId = alarm.getAlarmId();
            this.sender = new MemberDto.BaseResponse(alarm.getSender());
            this.content = alarm.getContent();
            this.alarmType = alarm.getAlarmType();
            this.createdAt = LocalDateTimeSerializer.toString(alarm.getCreatedAt());
        }
    }

    @Getter
    public static class PostResponse extends BaseResponse {

        private final Long postId;

        public PostResponse(Alarm alarm) {
            super(alarm);
            this.postId = alarm.getPost().getPostId();
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
