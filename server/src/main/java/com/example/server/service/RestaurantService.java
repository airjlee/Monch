package com.example.server.service;

import com.example.server.entity.Restaurant;
import com.example.server.repository.RestaurantRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private YelpService yelpService;

    @PostConstruct
    public void initializeDatabase() {
        updateRestaurants();
    }

    public void updateRestaurants() {
        String yelpResponse = yelpService.searchRestaurants("New York, NY", 50);
        storeRestaurants(yelpResponse);
    }

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    private void storeRestaurants(String yelpResponse) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode root = mapper.readTree(yelpResponse);
            JsonNode businesses = root.path("businesses");
            for (JsonNode business : businesses) {
                Restaurant restaurant = restaurantRepository
                        .findByYelpId(business.path("id").asText())
                        .orElse(new Restaurant());

                restaurant.setYelpId(business.path("id").asText());
                restaurant.setName(business.path("name").asText());
                restaurant.setImageUrl(business.path("image_url").asText());
                restaurant.setRating(business.path("rating").asDouble());
                restaurant.setReviewCount(business.path("review_count").asInt());
                restaurant.setAddress(business.path("location").path("address1").asText());
                restaurant.setCity(business.path("location").path("city").asText());
                restaurant.setState(business.path("location").path("state").asText());
                restaurant.setZipCode(business.path("location").path("zip_code").asText());

                restaurantRepository.save(restaurant);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
