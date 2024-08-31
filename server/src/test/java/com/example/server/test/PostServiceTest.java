package com.example.server.test;

import com.example.server.entity.Post;
import com.example.server.repository.PostRepository;
import com.example.server.service.PostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @InjectMocks
    private PostService postService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetPostsFromFollowing() {
        Post post1 = new Post();
        post1.setId(1L);
        post1.setUsername("user1");
        post1.setRating(4.5);
        post1.setRestaurantName("Restaurant A");
        post1.setImages(Collections.singletonList("image1.jpg"));
        post1.setCaption("Great food!");
        post1.setCreatedAt(LocalDateTime.now());

        Post post2 = new Post();
        post2.setId(2L);
        post2.setUsername("user2");
        post2.setRating(3.5);
        post2.setRestaurantName("Restaurant B");
        post2.setImages(Collections.singletonList("image2.jpg"));
        post2.setCaption("Average food.");
        post2.setCreatedAt(LocalDateTime.now());

        when(postRepository.findAllByOrderByCreatedAtDesc(any())).thenReturn(Arrays.asList(post1, post2));

        List<Post> result = postService.getPostsFromFollowing(1L);

        assertEquals(2, result.size());
        assertEquals(1L, result.get(0).getId());
        assertEquals(2L, result.get(1).getId());
        verify(postRepository, times(1)).findAllByOrderByCreatedAtDesc(any());
    }

    @Test
    void testCreatePost() {
        Post post = new Post();
        post.setUsername("user3");
        post.setRating(5.0);
        post.setRestaurantName("Restaurant C");
        post.setImages(Collections.singletonList("image3.jpg"));
        post.setCaption("Amazing experience!");

        Post savedPost = new Post();
        savedPost.setId(3L);
        savedPost.setUsername("user3");
        savedPost.setRating(5.0);
        savedPost.setRestaurantName("Restaurant C");
        savedPost.setImages(Collections.singletonList("image3.jpg"));
        savedPost.setCaption("Amazing experience!");
        savedPost.setCreatedAt(LocalDateTime.now());

        when(postRepository.save(post)).thenReturn(savedPost);

        Post result = postService.createPost(post);

        assertEquals(3L, result.getId());
        assertEquals("user3", result.getUsername());
        assertNotNull(result.getCreatedAt());
        verify(postRepository, times(1)).save(post);
    }
}
