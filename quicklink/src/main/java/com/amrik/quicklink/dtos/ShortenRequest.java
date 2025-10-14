package com.amrik.quicklink.dtos;

// This is a simple DTO (Data Transfer Object) class.
// Its only job is to carry the longUrl from the JSON request to our controller.

import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class ShortenRequest {
    private String longUrl;
    private String customAlias;
    private LocalDateTime expiresAt;
}
