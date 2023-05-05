package codejejus.inddybuddy.member.entity;

import codejejus.inddybuddy.global.utils.AuthorityUtils;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@Getter
public class MemberPrincipal implements UserDetails, OAuth2User {

    private final Member member;
    private Map<String, Object> attributes;

    public MemberPrincipal(Member member) {
        this.member = member;
    }

    public MemberPrincipal(Member member, Map<String, Object> attributes) {
        this.member = member;
        this.attributes = attributes;
    }

    public static MemberPrincipal of(Member member) {
        return new MemberPrincipal(member);
    }

    public static MemberPrincipal of(Member member, Map<String, Object> attributes) {
        return new MemberPrincipal(member, attributes);
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.getAuthorities(member.getRoles());
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

    @Override
    public String getUsername() {
        return member.getEmail();
    }

    @Override
    public String getName() {
        return attributes.get(member.getProviderId()).toString();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
