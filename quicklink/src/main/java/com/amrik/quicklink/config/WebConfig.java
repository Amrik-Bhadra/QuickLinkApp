package com.amrik.quicklink.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // This applies the CORS configuration to all endpoints
                .allowedOrigins("http://localhost:5173") // The origin of your React app
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // The HTTP methods you want to allow
                .allowedHeaders("*") // Allows all headers
                .allowCredentials(true);
    }
}
