package codejejus.inddybuddy.global.dto;

import lombok.Getter;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class ErrorFieldResponse {

    private final List<ErrorField> errors;

    public ErrorFieldResponse(List<ErrorField> errors) {
        this.errors = errors;
    }

    public static ErrorFieldResponse of(BindingResult bindingResult) {
        return new ErrorFieldResponse(ErrorField.of(bindingResult));
    }

    @Getter
    public static class ErrorField {

        private final String field;
        private final String request;
        private final String message;

        public ErrorField(FieldError fieldError) {
            this.field = fieldError.getField();
            this.request = (String) fieldError.getRejectedValue();
            this.message = fieldError.getDefaultMessage();
        }

        public static List<ErrorField> of(BindingResult bindingResult) {
            return bindingResult.getFieldErrors().stream().map(ErrorField::new).collect(Collectors.toList());
        }
    }
}
