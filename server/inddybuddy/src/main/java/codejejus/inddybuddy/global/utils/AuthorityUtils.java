package codejejus.inddybuddy.global.utils;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.stream.Collectors;

public class AuthorityUtils {

    private final String ADMIN_EMAIL = "admin@gmail.com";
    private final List<String> ADMIN_ROLES = List.of("ROLE_USER", "ROLE_ADMIN");
    private final List<String> USER_ROLES = List.of("ROLE_USER");

    public static List<SimpleGrantedAuthority> getAuthorities(List<String> roles) {
        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    public List<String> createRoles(String email) {
        if (email.equals(ADMIN_EMAIL)) {
            return ADMIN_ROLES;
        }
        return USER_ROLES;
    }
}
