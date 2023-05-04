package codejejus.inddybuddy.global.jwt.filter;

import codejejus.inddybuddy.global.jwt.JwtTokenProvider;
import codejejus.inddybuddy.member.dto.LoginDto;
import codejejus.inddybuddy.member.dto.MemberDto;
import codejejus.inddybuddy.member.entity.Member;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain filterChain,
                                            Authentication authentication) throws IOException {
        MemberPrincipal memberPrincipal = (MemberPrincipal) authentication.getPrincipal();
        Member member = memberPrincipal.getMember();

        String accessToken = jwtTokenProvider.generateAccessToken(member.getEmail(), member.getRoles());
        String refreshToken = jwtTokenProvider.generateRefreshToken();

        jwtTokenProvider.sendAccessAndRefreshToken(response, accessToken, refreshToken);
        setMemberResponse(response, member);
    }

    public void setMemberResponse(HttpServletResponse response, Member member) throws IOException {
        Gson gson = new Gson();
        MemberDto.Response memberResponse = memberToMemberDtoResponse(member);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_CREATED);
        response.getWriter().write(gson.toJson(memberResponse, MemberDto.Response.class));
    }

    private MemberDto.Response memberToMemberDtoResponse(Member member) {
        if (member == null) {
            return null;
        }

        Long id = member.getMemberId();
        String email = member.getEmail();
        String username = member.getUsername();
        Member.MemberStatus memberStatus = member.getMemberStatus();

        return new MemberDto.Response(id, email, username, memberStatus);
    }
}
