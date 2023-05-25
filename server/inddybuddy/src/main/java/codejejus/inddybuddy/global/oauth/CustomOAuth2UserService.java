package codejejus.inddybuddy.global.oauth;

import codejejus.inddybuddy.member.MemberRepository;
import codejejus.inddybuddy.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("OAuth2User loadUser() 실행 - 유저 정보 불러오기");

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String provider = userRequest.getClientRegistration()
                .getRegistrationId();
        log.info("provider: {}", provider);
        String providerId = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();
        log.info("providerId : {}", providerId);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        OAuthAttributes oAuthAttributes = OAuthAttributes.of(provider, providerId, attributes);

        Member member = getMember(oAuthAttributes, provider);

        log.info("CustomOAuth2User 반환");
        return CustomOAuth2User.of(member, attributes, oAuthAttributes);
    }

    private Member getMember(OAuthAttributes attributes, String provider) {
        return memberRepository.findByEmail(attributes.getOAuth2UserInfo().getEmail())
                .orElseGet(() -> createMember(attributes, provider));
    }

    private Member createMember(OAuthAttributes attributes, String provider) {
        Member member = verifyMemberUsername(attributes, provider);
        return memberRepository.save(member);
    }

    private Member verifyMemberUsername(OAuthAttributes attributes, String provider) {
        if (memberRepository.existsByUsername(attributes.getOAuth2UserInfo().getUsername())) {
            return attributes.toEntity(attributes.getOAuth2UserInfo(), UUID.randomUUID().toString(), provider, passwordEncoder);
        }
        return attributes.toEntity(attributes.getOAuth2UserInfo(), attributes.getOAuth2UserInfo().getUsername(), provider, passwordEncoder);
    }
}
