package com.example.server.test;
import com.example.server.entity.User;
import com.example.server.exception.UserNotFoundException;
import com.example.server.repository.UserRepository;
import com.example.server.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    private UserService userService;

    private User testUser;
    private User follower;

    @BeforeEach
    void setUp() {
        userService = new UserService(userRepository);
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testUser");
        follower = new User();
        follower.setId(2L);
        follower.setUsername("follower");
    }

    @Test
    public void testFollowUser() throws UserNotFoundException {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.findById(2L)).thenReturn(Optional.of(follower));
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        User result = userService.followUser(1L, 2L);

        assertEquals(testUser, result);
        assertTrue(testUser.getFollowers().contains(follower));
        assertTrue(follower.getFollowing().contains(testUser));
        verify(userRepository, times(2)).save(any(User.class));
    }

    @Test
    public void testFollowUser_UserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.followUser(1L, 2L));
    }

    @Test
    public void testUnfollowUser() throws UserNotFoundException {
        testUser.getFollowers().add(follower);
        follower.getFollowing().add(testUser);

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.findById(2L)).thenReturn(Optional.of(follower));
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        User result = userService.unfollowUser(1L, 2L);

        assertEquals(testUser, result);
        assertFalse(testUser.getFollowers().contains(follower));
        assertFalse(follower.getFollowing().contains(testUser));
        verify(userRepository, times(2)).save(any(User.class));
    }

    @Test
    public void testGetFollowing() throws UserNotFoundException {
        List<User> following = Arrays.asList(new User(), new User());
        testUser.setFollowing(following);

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        List<User> result = userService.getFollowing(1L);

        assertEquals(following, result);
    }

    @Test
    public void testGetFollowers() throws UserNotFoundException {
        List<User> followers = Arrays.asList(new User(), new User());
        testUser.setFollowers(followers);

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        List<User> result = userService.getFollowers(1L);

        assertEquals(followers, result);
    }
}
