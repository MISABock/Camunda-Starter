package com.example.demo.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.io.IOException;

@Configuration
@Order(Integer.MIN_VALUE) // HÖCHSTE PRIORITÄT – nach allem anderen!
public class FinalCspAndXFrameOverrideFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        chain.doFilter(request, response); // erst Camunda durchlassen

        HttpServletResponse httpResp = (HttpServletResponse) response;

        // Jetzt ALLES überschreiben
        httpResp.setHeader("Content-Security-Policy", "frame-ancestors 'self' http://localhost:3000");
        httpResp.setHeader("X-Frame-Options", "ALLOW-FROM http://localhost:3000");
    }
}
