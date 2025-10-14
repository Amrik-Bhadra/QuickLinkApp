package com.amrik.quicklink.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Setter;
import lombok.Getter;

@Getter  // Automatically generates all getter methods at compile time
@Setter  // Automatically generates all setter methods at compile time
@Entity
@Table(name="url_mapping")
public class UrlMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String shortCode;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String longUrl;

    @Column(nullable = false)
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;

    private long clickCount;
}
