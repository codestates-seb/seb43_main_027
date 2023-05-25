package codejejus.inddybuddy.global.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

    private final ExceptionCode exceptionCode;

    public CustomException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
