package codejejus.inddybuddy.global.utils;

import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ResponseUtils {

    public static void setResponseStatus(HttpServletResponse response,
                                         int httpStatus,
                                         Object responseObject) throws IOException {
        response.setStatus(httpStatus);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(GsonUtils.gson.toJson(responseObject));
    }
}
