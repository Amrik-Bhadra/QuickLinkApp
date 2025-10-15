package com.amrik.quicklink.controllers;

import com.amrik.quicklink.dtos.ShortenRequest;
import com.amrik.quicklink.dtos.UrlStatsResponse;
import com.amrik.quicklink.model.UrlMapping;
import com.amrik.quicklink.services.UrlShortenerService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/url")
public class UrlShortenerController {
    @Autowired
    private UrlShortenerService urlShortenerService;

    @PostMapping("/shorten")
    public ResponseEntity<String> shortenUrl(@RequestBody ShortenRequest request, HttpServletRequest servletRequest) {
        // input validation to ensure the URL is not empty
        if(request.getLongUrl() == null || request.getLongUrl().isEmpty()){
            return new ResponseEntity<>("Url cannot be empty", HttpStatus.BAD_REQUEST);
        }

        try{
            String shortCode = urlShortenerService.shortenUrl(request);
            String baseUrl = getBaseURL(servletRequest);
            String shortUrl = baseUrl + '/' + shortCode;
            return new ResponseEntity<>(shortUrl, HttpStatus.CREATED);
        }catch (IllegalArgumentException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/stats/{shortCode}")
    public ResponseEntity<?> getUrlStats(@PathVariable String shortCode){
        Optional<UrlMapping> urlMappingOptional = urlShortenerService.getLongUrl(shortCode);

        if(urlMappingOptional.isPresent()){
            UrlMapping urlMapping = urlMappingOptional.get();

            UrlStatsResponse stats = new UrlStatsResponse(
                    urlMapping.getLongUrl(),
                    urlMapping.getCreatedAt(),
                    urlMapping.getClickCount()
            );

            return ResponseEntity.ok(stats);
        }else{
            return new ResponseEntity<>("No URL found for short code: " + shortCode, HttpStatus.NOT_FOUND);
        }
    }

    private String getBaseURL(HttpServletRequest request){
        String scheme = request.getScheme();  // http or https
        String serverName = request.getServerName(); // localhost or domain-name
        int serverPort = request.getServerPort(); // 8080 or 80 or 443 etc

        StringBuilder baseUrl = new StringBuilder();
        baseUrl.append(scheme).append("://").append(serverName);

        if((scheme.equals("http") && serverPort != 80) || (scheme.equals("https") && serverPort != 443)){
            baseUrl.append(":").append(serverPort);
        }

        return baseUrl.toString();
    }
}
