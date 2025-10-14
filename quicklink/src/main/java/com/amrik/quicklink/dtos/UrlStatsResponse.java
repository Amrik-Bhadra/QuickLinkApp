package com.amrik.quicklink.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor  // A Lombok annotation to create a constructor with all fields
public class UrlStatsResponse {
    private String longUrl;
    private LocalDateTime createdAt;
    private long clickCount;
}
