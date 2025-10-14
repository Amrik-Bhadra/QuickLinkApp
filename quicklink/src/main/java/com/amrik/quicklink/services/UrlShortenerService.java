package com.amrik.quicklink.services;

import com.amrik.quicklink.dtos.ShortenRequest;
import com.amrik.quicklink.model.UrlMapping;
import com.amrik.quicklink.repository.UrlMappingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UrlShortenerService {
    private static final String BASE62_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    @Autowired
    private UrlMappingRepository urlMappingRepository;

    public String shortenUrl(ShortenRequest request) {
        String longUrl = request.getLongUrl();
        String customAlias = request.getCustomAlias();

        // If a custom alias is provided
        if(customAlias != null && !customAlias.isEmpty()){
            // Check if the alias already exists in the database
            if(urlMappingRepository.findByShortCode(customAlias).isPresent()){
                // If it exists, throw an exception (or handle the error as you see fit)
                throw  new IllegalArgumentException("Custom alias already in use");
            }
            // If it's available, use it as the short code
            UrlMapping urlMapping = new UrlMapping();
            urlMapping.setLongUrl(longUrl);
            urlMapping.setShortCode(customAlias);
            urlMapping.setCreatedAt(LocalDateTime.now());
            urlMapping.setExpiresAt(request.getExpiresAt());
            urlMappingRepository.save(urlMapping);
            return customAlias;
        }else{
            // If no custom alias is provided, use the original ID-based logic
            UrlMapping urlMapping = new UrlMapping();
            urlMapping.setLongUrl(longUrl);
            urlMapping.setCreatedAt(LocalDateTime.now());
            urlMapping.setExpiresAt(request.getExpiresAt());
            UrlMapping savedEntity = urlMappingRepository.save(urlMapping);

            String shortCode = encodeToBase62(savedEntity.getId());
            savedEntity.setShortCode(shortCode);
            urlMappingRepository.save(savedEntity);

            return shortCode;
        }
    }

    private String encodeToBase62(long n) {
        StringBuilder sb = new StringBuilder();
        if (n == 0) {
            return "0";
        }
        while (n > 0) {
            sb.append(BASE62_CHARS.charAt((int) (n % 62)));
            n /= 62;
        }
        return sb.reverse().toString();
    }

    public Optional<UrlMapping> getLongUrl(String shortCode){
        Optional<UrlMapping> urlMappingOptional = urlMappingRepository.findByShortCode(shortCode);

        // If it exists, increment the click count.
        if (urlMappingOptional.isPresent()) {
            UrlMapping urlMapping = urlMappingOptional.get();

            // --- EXPIRATION CHECK ---
            if (urlMapping.getExpiresAt() != null && urlMapping.getExpiresAt().isBefore(LocalDateTime.now())) {
                // If the link is expired, delete it and return nothing.
                urlMappingRepository.delete(urlMapping);
                return Optional.empty();
            }

            // If not expired, increment the click count.
            urlMapping.setClickCount(urlMapping.getClickCount() + 1);
            urlMappingRepository.save(urlMapping);
        }

        return urlMappingOptional;
    }



}
