package codejejus.inddybuddy.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionCode {

    MEMBER_EMAIL_EXIST(409, "이미 사용중인 이메일 입니다."),
    MEMBER_USERNAME_EXIST(409, "이미 사용중인 닉네임 입니다."),
    GAME_NAME_EXIST(409, "이미 존재하는 게임 입니다."),
    ALREADY_EXIST_FOLLOW(409, "이미 팔로우 관계입니다."),
    ALREADY_EXIST_LIKE(409, "이미 좋아요/싫어요 를 누른 게시글입니다."),
    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    GAME_NOT_FOUND(404, "게임을 찾을 수 없습니다."),
    POST_NOT_FOUND(404, "게시글을 찾을 수 없습니다."),
    COMMENT_NOT_FOUND(404, "댓글을 찾을 수 없습니다."),
    PROVIDER_NOT_FOUND(404, "지원하지 않는 OAuth 유형입니다."),
    FOLLOW_NOT_FOUND(404, "팔로워 관계가 아닙니다."),
    CATEGORY_NOT_FOUND(404, "카테고리를 찾을 수 없습니다."),
    FILTER_NOT_FOUND(404, "없는 필터입니다."),
    MEMBER_NOT_SAME(403, "일치하지 않는 회원입니다."),
    CANT_FOLLOW_SELF(403, "자기 자신은 팔로우할 수 없습니다."),
    NEED_DIFFERENT_MEMBER(403, "다른 유저여야 합니다."),
    EMPTY_FILE(400, "빈 파일입니다.");

    private final int code;
    private final String message;
}
