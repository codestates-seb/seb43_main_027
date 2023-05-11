package codejejus.inddybuddy.global.oauth.handler;

import codejejus.inddybuddy.global.jwt.JwtTokenProvider;
import codejejus.inddybuddy.global.oauth.CustomOAuth2User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        log.info("OAuth login 성공");
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        loginSuccess(response, request, oAuth2User);
    }

    private void loginSuccess(HttpServletResponse response, HttpServletRequest request, CustomOAuth2User oAuth2User) throws IOException {
        String accessToken = jwtTokenProvider.generateAccessToken(oAuth2User.getEmail(), oAuth2User.getRoles());
        String refreshToken = jwtTokenProvider.generateRefreshToken();
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
        log.info("accessToken : {}", accessToken);
        log.info("refreshToken : {}", refreshToken);
        jwtTokenProvider.sendAccessAndRefreshToken(response, accessToken, refreshToken);
        response.addCookie(jwtToCookie(accessToken));
        log.info(request.getServletPath());
        response.sendRedirect(createURI(accessToken));
    }

    private Cookie jwtToCookie(String accessToken) {
        String COOKIE_NAME = "token";
        Cookie cookie = new Cookie(COOKIE_NAME, accessToken);
        cookie.setMaxAge(3600);  // 테스트 후 더 짧게 유지할 계획입니다.
        cookie.setPath("/");
        return cookie;
    }

    private String createURI(String accessToken) {
        return UriComponentsBuilder.newInstance()
                .scheme("http")
                .host("localhost")
                .port(3000)
                .path("googleLogin")
                .queryParam(accessToken)
                .encode(StandardCharsets.UTF_8)
                .build()
                .toUriString();
    }
}
