package com.example.server.service;

import com.example.server.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import com.example.server.entity.User;
import com.example.server.repository.UserRepository;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User followUser(Long userId, Long followId) throws UserNotFoundException {
        User user = findById(userId);
        User follower = findById(followId);

        user.getFollowers().add(follower);
        follower.getFollowing().add(user);

        userRepository.save(user);
        userRepository.save(follower);

        return user;
    }

    public User unfollowUser(Long userId, Long unfollowId) {
        User user = findById(userId);
        User unfollower = findById(unfollowId);

        user.getFollowers().remove(unfollower);
        unfollower.getFollowing().remove(user);

        userRepository.save(user);
        userRepository.save(unfollower);

        return user;
    }

    public List<User> getFollowing(Long userId) {
        User user = findById(userId);
        return user.getFollowing();
    }

    public List<User> getFollowers(Long userId) {
        User user = findById(userId);
        return user.getFollowers();
    }

    public User findById(Long id) throws UserNotFoundException {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new UserNotFoundException(id);
        }
        return user.get();
    }

}
