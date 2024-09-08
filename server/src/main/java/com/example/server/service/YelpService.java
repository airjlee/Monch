package com.example.server.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class YelpService {

    @Value("${yelp.api.key}")
    private String apiKey;

    private final String API_BASE_URL = "https://api.yelp.com/v3";

    public String searchRestaurants(String location, int limit) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        String url = API_BASE_URL + "/businesses/search?term=restaurants&location=" + location + "&limit=" + limit;

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
        return restTemplate.exchange(url, HttpMethod.GET, entity, String.class).getBody();
    }
}
