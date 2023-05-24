package codejejus.inddybuddy.global.config;

import codejejus.inddybuddy.global.jwt.JwtTokenProvider;
import codejejus.inddybuddy.global.jwt.filter.JwtAuthenticationFilter;
import codejejus.inddybuddy.global.jwt.filter.JwtExceptionFilter;
import codejejus.inddybuddy.global.jwt.filter.JwtVerificationFilter;
import codejejus.inddybuddy.global.jwt.handler.JwtAccessDeniedHandler;
import codejejus.inddybuddy.global.jwt.handler.MemberAuthenticationFailureHandler;
import codejejus.inddybuddy.global.jwt.handler.MemberAuthenticationSuccessHandler;
import codejejus.inddybuddy.global.oauth.CustomOAuth2UserService;
import codejejus.inddybuddy.global.oauth.handler.OAuth2LoginFailureHandler;
import codejejus.inddybuddy.global.oauth.handler.OAuth2LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final CustomOAuth2UserService oAuth2UserService;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .httpBasic().disable()
                .formLogin().disable()
                .csrf().disable()
                .apply(new CustomFilterConfigurer())

                .and()
                .cors().configurationSource(corsConfigurationSource())

                .and()
                .headers().frameOptions().disable()

                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/**").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.PATCH, "/api/**").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/**").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/api/oauth/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/members/signup").permitAll()
                .antMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                .anyRequest().permitAll()

                .and()
                .oauth2Login()
                .successHandler(oAuth2LoginSuccessHandler)
                .failureHandler(oAuth2LoginFailureHandler)
                .userInfoEndpoint().userService(oAuth2UserService);

        return httpSecurity.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "PUT", "DELETE", "HEAD"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

        @Override
        public void configure(HttpSecurity httpSecurity) throws Exception {
            AuthenticationManager authenticationManager = httpSecurity.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager);
            jwtAuthenticationFilter.setFilterProcessesUrl("/api/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler(jwtTokenProvider));
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenProvider);

            httpSecurity
                    .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                    .addFilterBefore(jwtVerificationFilter, JwtAuthenticationFilter.class)
                    .addFilterBefore(new JwtExceptionFilter(), jwtVerificationFilter.getClass())
                    .exceptionHandling()
                    .accessDeniedHandler(new JwtAccessDeniedHandler());
        }
    }
}
