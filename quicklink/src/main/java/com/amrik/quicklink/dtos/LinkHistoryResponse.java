package com.amrik.quicklink.dtos;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LinkHistoryResponse {
    private String shortUrl;
    private String longUrl;
}