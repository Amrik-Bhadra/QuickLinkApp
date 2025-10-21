package com.amrik.quicklink.repository;

import com.amrik.quicklink.model.UrlMapping;
import com.amrik.quicklink.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping, Long> {
    Optional<UrlMapping> findByShortCode(String shortCode);
    List<UrlMapping> findAllByUser(User user);
}
