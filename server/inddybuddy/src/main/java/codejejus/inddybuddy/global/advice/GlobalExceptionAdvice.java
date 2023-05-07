package codejejus.inddybuddy.global.advice;

import codejejus.inddybuddy.global.dto.ErrorResponse;
import codejejus.inddybuddy.global.exception.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException customException) {
        ErrorResponse errorResponse = ErrorResponse.of(customException.getExceptionCode());
        return new ResponseEntity<>(errorResponse, HttpStatus.valueOf(customException.getExceptionCode().getCode()));
    }
}
