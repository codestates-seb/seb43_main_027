package codejejus.inddybuddy.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    GAME_NOT_FOUND(404, "게임을 찾을 수 없습니다.");
    private final int code;
    private final String message;
}
