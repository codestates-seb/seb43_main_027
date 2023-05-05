package codejejus.inddybuddy.member.entity;

import codejejus.inddybuddy.global.utils.AuthorityUtils;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Getter
public class MemberPrincipal implements UserDetails {

    private final Member member;

    public MemberPrincipal(Member member) {
        this.member = member;
    }

    public static MemberPrincipal of(Member member) {
        return new MemberPrincipal(member);
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
