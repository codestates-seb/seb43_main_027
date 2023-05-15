package codejejus.inddybuddy.global.jwt.handler;

import codejejus.inddybuddy.global.utils.GsonUtils;
import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        log.info("# Authenticated success");
        MemberPrincipal memberPrincipal = (MemberPrincipal) authentication.getPrincipal();
        Member member = memberPrincipal.getMember();
        setMemberResponse(response, member);
    }

    public void setMemberResponse(HttpServletResponse response, Member member) throws IOException {
        MemberDto.Response memberResponse = memberToMemberDtoResponse(member);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_OK);
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(GsonUtils.gson.toJson(memberResponse, MemberDto.Response.class));
    }

    private MemberDto.Response memberToMemberDtoResponse(Member member) {
        if (member == null) {
            return null;
        }
        return new MemberDto.Response(
                member.getMemberId(),
                member.getEmail(),
                member.getUsername(),
                member.getMemberStatus(),
                member.getImageUrl(),
                member.getAboutMe(),
                member.getCreatedAt(),
                member.getUpdatedAt());
    }
}
