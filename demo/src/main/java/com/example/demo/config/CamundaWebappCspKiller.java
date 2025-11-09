package com.example.demo.config;

import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Configuration;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;

@Configuration
public class CamundaWebappCspKiller implements ServletContextInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {

        // Camunda-eigenen CSP Filter explizit deaktivieren:
        servletContext.setInitParameter("camunda-webapp.csp", "false");

        // Alternative ältere Variante (manche Camunda-Versionen):
        servletContext.setInitParameter("org.camunda.bpm.webapp.csp", "false");
    }
}
