package codejejus.inddybuddy.global.oauth;

import codejejus.inddybuddy.global.utils.AuthorityUtils;
import codejejus.inddybuddy.member.entity.Member;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Getter
public class CustomOAuth2User extends DefaultOAuth2User {

    private final String email;
    private final List<String> roles;

    public CustomOAuth2User(Collection<? extends GrantedAuthority> authorities,
                            Map<String, Object> attributes,
                            String nameAttributeKey,
                            String email,
                            List<String> roles) {
        super(authorities, attributes, nameAttributeKey);
        this.email = email;
        this.roles = roles;
    }

    public static CustomOAuth2User of(Member member,
                                      Map<String, Object> attributes,
                                      OAuthAttributes oAuthAttributes) {
        return new CustomOAuth2User(
                AuthorityUtils.getAuthorities(member.getRoles()),
                attributes,
                oAuthAttributes.getProviderId(),
                member.getEmail(),
                member.getRoles());
    }
}
