package com.amrik.quicklink.controllers;

import com.amrik.quicklink.model.UrlMapping;
import com.amrik.quicklink.services.UrlShortenerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Optional;

@RestController
public class RedirectController {
    @Autowired
    private UrlShortenerService urlShortenerService;

    @GetMapping("/{shortCode}")
    public Object redirectToLongUrl(@PathVariable String shortCode) {
        Optional<UrlMapping> urlMappingOptional = urlShortenerService.getLongUrl(shortCode);

        if (urlMappingOptional.isPresent()) {
            RedirectView redirectView = new RedirectView();
            redirectView.setUrl(urlMappingOptional.get().getLongUrl());
            return redirectView;
        } else {
            return new ResponseEntity<>("No URL found for short code: " + shortCode, HttpStatus.NOT_FOUND);
        }
    }
}
