package com.example.server.service;

import com.example.server.entity.User;
import com.example.server.exception.PostNotFoundException;
import com.example.server.exception.UserNotFoundException;
import com.example.server.entity.Post;
import com.example.server.repository.PostRepository;
import com.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Post> getPostsFromFollowing(Long userId) throws UserNotFoundException{
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException(userId);
        }

        User user = userOptional.get();
        List<User> following = user.getFollowing();
        return postRepository.findAllByOrderByCreatedAtDesc(following);
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public Post updatePost(Long id, Post postDetails) {
        // get post
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isEmpty()) {
            throw new PostNotFoundException(id);
        }

        Post post = postOptional.get();

        // set caption
        post.setCaption(postDetails.getCaption());

        // save post
        return postRepository.save(post);
    }

    public void deletePost(Long id) throws PostNotFoundException {
        // find post
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isEmpty()) {
            throw new PostNotFoundException(id);
        }

        Post post = postOptional.get();
        // delete post
        postRepository.delete(post);
    }
}
