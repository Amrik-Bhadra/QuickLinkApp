package com.amrik.quicklink.security;

import com.amrik.quicklink.repository.TokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component // Marks this as a Spring component to be managed
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final TokenRepository tokenRepository;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService, TokenRepository tokenRepository) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.tokenRepository = tokenRepository;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // Check if the Authorization header is present and correctly formatted
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response); // If not, pass the request to the next filter
            return;
        }

        // Extract the JWT from the header
        jwt = authHeader.substring(7); // "Bearer ".length() is 7

        // Extract the user's email from the JWT
        userEmail = jwtService.extractUsername(jwt);

        // Check if the user is not already authenticated for this request
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load the user's details from the database
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            var isTokenValidInDb = tokenRepository.findByToken(jwt)
                    .map(t -> !t.isExpired() && !t.isRevoked())
                    .orElse(false);

            // Validate the token
            if (jwtService.isTokenValid(jwt, userDetails) && isTokenValidInDb) {
                // If the token is valid, create an authentication token
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null, // We don't need credentials
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                // Update the SecurityContextHolder, marking the user as authenticated
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        // Pass the request along to the next filter in the chain
        filterChain.doFilter(request, response);
    }
}
