package com.example.server.test;

import com.example.server.controller.PostController;
import com.example.server.entity.Post;
import com.example.server.service.PostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class PostControllerTest {

    @Mock
    private PostService postService;

    @InjectMocks
    private PostController postController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getPostsFromFollowing_Success() {
        List<Post> posts = Arrays.asList(new Post(), new Post());
        when(postService.getPostsFromFollowing(1L)).thenReturn(posts);

        ResponseEntity<List<Post>> response = postController.getPostsFromFollowing(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(posts, response.getBody());
        verify(postService, times(1)).getPostsFromFollowing(1L);
    }

    @Test
    void createPost_Success() {
        Post post = new Post();
        when(postService.createPost(post)).thenReturn(post);

        ResponseEntity<Post> response = postController.createPost(post);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(post, response.getBody());
        verify(postService, times(1)).createPost(post);
    }

}
