package com.example.server.test;

import com.example.server.controller.UserController;
import com.example.server.entity.User;
import com.example.server.exception.UserNotFoundException;
import com.example.server.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testUser");
    }

    @Test
    public void testFollowUser() throws Exception {
        when(userService.followUser(1L, 2L)).thenReturn(testUser);

        mockMvc.perform(post("/api/users/1/follow")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testUser"));

        verify(userService).followUser(1L, 2L);
    }

    @Test
    public void testFollowUser_UserNotFound() throws Exception {
        when(userService.followUser(1L, 2L)).thenThrow(new UserNotFoundException(1L));

        mockMvc.perform(post("/api/users/1/follow")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("2"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUnfollowUser() throws Exception {
        when(userService.unfollowUser(1L, 2L)).thenReturn(testUser);

        mockMvc.perform(post("/api/users/1/unfollow")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testUser"));

        verify(userService).unfollowUser(1L, 2L);
    }

    @Test
    public void testGetFollowing() throws Exception {
        List<User> following = Arrays.asList(new User(), new User());
        when(userService.getFollowing(1L)).thenReturn(following);

        mockMvc.perform(get("/api/users/1/following"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));

        verify(userService).getFollowing(1L);
    }

    @Test
    public void testGetFollowers() throws Exception {
        List<User> followers = Arrays.asList(new User(), new User());
        when(userService.getFollowers(1L)).thenReturn(followers);

        mockMvc.perform(get("/api/users/1/followers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));

        verify(userService).getFollowers(1L);
    }
}