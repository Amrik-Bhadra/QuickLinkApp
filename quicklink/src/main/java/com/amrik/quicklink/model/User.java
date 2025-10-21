package com.amrik.quicklink.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data // A Lombok annotation that combines @Getter, @Setter, @ToString, etc.
@Builder // A Lombok annotation to help build objects easily
@NoArgsConstructor // Lombok
@AllArgsConstructor // Lombok
@Entity
@Table(name = "_user") // We use "_user" because "user" is often a reserved keyword in SQL
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // We can define user roles here (e.g., USER, ADMIN)
        // For simplicity, we'll give every user the role "USER"
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        // Our "username" is the user's email address
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        // We can add logic here to expire accounts
        return true; // For now, accounts never expire
    }

    @Override
    public boolean isAccountNonLocked() {
        // We can add logic to lock accounts after too many failed login attempts
        return true; // For now, accounts are never locked
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // We can add logic for password expiration
        return true; // For now, credentials never expire
    }

    @Override
    public boolean isEnabled() {
        // We can add logic for email verification to enable accounts
        return true; // For now, accounts are enabled by default
    }
}
