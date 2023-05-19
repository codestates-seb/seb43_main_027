package codejejus.inddybuddy.global.utils;

import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;

public class ResponseUtils {
    public static void setStatus(HttpServletResponse response, int httpStatus) {
        response.setStatus(httpStatus);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
    }
}
