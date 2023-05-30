package codejejus.inddybuddy.notification;

import lombok.Getter;

@Getter
public enum AlarmType {

    POST_LIKE("게시글 좋아요"),
    REPLY_SUB_COMMENT("대댓글"),
    MESSAGE("메시지"),
    FOLLOW_REQUEST("팔로우요청"),
    REPLY_COMMENT("댓글");

    private final String name;

    AlarmType(String name) {
        this.name = name;
    }
}