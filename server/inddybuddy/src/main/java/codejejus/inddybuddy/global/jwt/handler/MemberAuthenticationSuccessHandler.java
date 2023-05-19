package codejejus.inddybuddy.global.jwt.handler;

import codejejus.inddybuddy.global.dto.ErrorResponse;
import codejejus.inddybuddy.global.jwt.JwtTokenProvider;
import codejejus.inddybuddy.global.utils.GsonUtils;
import codejejus.inddybuddy.global.utils.ResponseUtils;
import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

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
            setMemberResponse(response, member);
        } else {
            Gson gson = new Gson();
            ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.NOT_ACCEPTABLE, "탈퇴한 회원입니다.");
            ResponseUtils.setStatus(response, HttpServletResponse.SC_NOT_ACCEPTABLE);
            response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
        }
    }

    public void setMemberResponse(HttpServletResponse response, Member member) throws IOException {
        MemberDto.Response memberResponse = memberToMemberDtoResponse(member);
        ResponseUtils.setStatus(response, HttpServletResponse.SC_OK);
        response.getWriter().write(GsonUtils.gson.toJson(memberResponse, MemberDto.Response.class));
    }

    private MemberDto.Response memberToMemberDtoResponse(Member member) {
        return new MemberDto.Response(member);
    }
}
