package codejejus.inddybuddy.notification;

import org.springframework.stereotype.Component;

@Component
public class AlarmMapper {

    AlarmDto.BaseResponse notificationResponseNotificationDto(Alarm alarm) {
        AlarmType alarmType = alarm.getAlarmType();

        switch (alarmType) {
            case REPLY_COMMENT:
            case REPLY_SUB_COMMENT:
                return ofCommentResponse(alarm);
            case POST_LIKE:
                return ofPostResponse(alarm);
            default:
                return ofBaseResponse(alarm);
        }
    }

    private AlarmDto.CommentResponse ofCommentResponse(Alarm alarm) {
        return new AlarmDto.CommentResponse(alarm);
    }

    private AlarmDto.PostResponse ofPostResponse(Alarm alarm) {
        return new AlarmDto.PostResponse(alarm);
    }

    private AlarmDto.BaseResponse ofBaseResponse(Alarm alarm) {
        return new AlarmDto.BaseResponse(alarm);
    }
}
