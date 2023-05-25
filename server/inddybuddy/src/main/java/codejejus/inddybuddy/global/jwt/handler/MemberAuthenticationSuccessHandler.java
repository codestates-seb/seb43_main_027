package codejejus.inddybuddy.global.jwt.handler;

import codejejus.inddybuddy.global.dto.ErrorResponse;
import codejejus.inddybuddy.global.jwt.JwtTokenProvider;
import codejejus.inddybuddy.global.utils.ResponseUtils;
import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static codejejus.inddybuddy.global.constant.Constants.ACCOUNT_DELETED;

@Slf4j
@RequiredArgsConstructor
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        log.info("# Authenticated success");
        MemberPrincipal memberPrincipal = (MemberPrincipal) authentication.getPrincipal();
        Member member = memberPrincipal.getMember();

        if (member.getMemberStatus() == Member.MemberStatus.ACTIVE) {
            String accessToken = jwtTokenProvider.generateAccessToken(member.getEmail(), member.getRoles());
            String refreshToken = jwtTokenProvider.generateRefreshToken();
            jwtTokenProvider.sendAccessAndRefreshToken(response, accessToken, refreshToken);

            ResponseUtils.setResponseStatus(response, HttpServletResponse.SC_OK, new MemberDto.Response(member));
        } else if (member.getMemberStatus() == Member.MemberStatus.DELETE) {
            ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.NOT_ACCEPTABLE, ACCOUNT_DELETED);
            ResponseUtils.setResponseStatus(response, HttpServletResponse.SC_NOT_ACCEPTABLE, errorResponse);
        }
    }
}
