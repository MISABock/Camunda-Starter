package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    @Order(0)
    public SecurityFilterChain allowIframeForCamunda(HttpSecurity http) throws Exception {
        http
            .securityMatcher("/camunda/**", "/app/**")
            .headers(headers -> headers
                .frameOptions(frame -> frame.disable()) // !!! X-FRAME-OPTIONS wird HIER KILLT !!!
                .contentSecurityPolicy(csp -> csp
                    .policyDirectives("frame-ancestors 'self' http://localhost:3000")
                )
            )
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());

        return http.build();
    }
}
