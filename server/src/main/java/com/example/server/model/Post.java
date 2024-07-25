package com.example.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private double rating;
    private String restaurantName;
    private String[] images;
    private String caption;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;
}
