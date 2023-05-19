package codejejus.inddybuddy.global.jwt.handler;

import codejejus.inddybuddy.global.dto.ErrorResponse;
import codejejus.inddybuddy.global.utils.ResponseUtils;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static codejejus.inddybuddy.global.constant.Constants.*;

@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {
        log.error("# Authentication failed : {}", exception.getMessage());
        String errorMessage = getErrorMessage(exception);
        sendErrorResponse(response, errorMessage);
    }

    private String getErrorMessage(AuthenticationException exception) {
        if (exception instanceof UsernameNotFoundException) return ACCOUNT_NOT_FOUND;
        if (exception instanceof BadCredentialsException) return CREDENTIAL_NOT_FOUND;
        return UNKNOWN_LOGIN_ERROR;
    }

    private void sendErrorResponse(HttpServletResponse response, String errorMessage) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED, errorMessage);
        ResponseUtils.setStatus(response, HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
