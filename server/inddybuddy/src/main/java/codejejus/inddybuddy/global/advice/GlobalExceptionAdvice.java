package codejejus.inddybuddy.global.advice;

import codejejus.inddybuddy.global.dto.ErrorFieldResponse;
import codejejus.inddybuddy.global.dto.ErrorResponse;
import codejejus.inddybuddy.global.exception.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException customException) {
        ErrorResponse errorResponse = ErrorResponse.of(customException.getExceptionCode());
        return new ResponseEntity<>(errorResponse, HttpStatus.valueOf(customException.getExceptionCode().getCode()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorFieldResponse> handleValidationException(BindingResult bindingResult) {
        ErrorFieldResponse errorFieldResponse = ErrorFieldResponse.of(bindingResult);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorFieldResponse);
    }
}
