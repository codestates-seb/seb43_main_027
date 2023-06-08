package codejejus.inddybuddy.global.oauth;

import codejejus.inddybuddy.global.exception.CustomException;
import codejejus.inddybuddy.global.exception.ExceptionCode;
import codejejus.inddybuddy.global.oauth.userinfo.GoogleUserInfo;
import codejejus.inddybuddy.global.oauth.userinfo.OAuth2UserInfo;
import codejejus.inddybuddy.global.oauth.userinfo.ProviderType;
import codejejus.inddybuddy.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Map;
import java.util.UUID;

@Getter
public class OAuthAttributes {

    private final String providerId;
    private final OAuth2UserInfo oAuth2UserInfo;

    @Builder
    public OAuthAttributes(String providerId, OAuth2UserInfo oAuth2UserInfo) {
        this.providerId = providerId;
        this.oAuth2UserInfo = oAuth2UserInfo;
    }

    public static OAuthAttributes of(String provider,
                                     String providerId,
                                     Map<String, Object> attributes) {
        if (provider.equals(ProviderType.GOOGLE.getProvider())) {
            return ofGoogle(providerId, attributes);
        }
        throw new CustomException(ExceptionCode.PROVIDER_NOT_FOUND);
    }

    private static OAuthAttributes ofGoogle(String providerId,
                                            Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .providerId(providerId)
                .oAuth2UserInfo(new GoogleUserInfo(attributes))
                .build();
    }

    public Member toEntity(OAuth2UserInfo oAuth2UserInfo,
                           String username,
                           String provider,
                           PasswordEncoder passwordEncoder) {
        return new Member(
                oAuth2UserInfo.getEmail(),
                passwordEncoder.encode("OAUTH" + UUID.randomUUID()),
                username,
                oAuth2UserInfo.getImageUrl(),
                Collections.singletonList("ROLE_USER"),
                provider,
                oAuth2UserInfo.getProviderId()
        );
    }
}
