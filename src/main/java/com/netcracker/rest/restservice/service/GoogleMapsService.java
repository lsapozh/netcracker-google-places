package com.netcracker.rest.restservice.service;

import com.google.maps.DistanceMatrixApi;
import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;
import com.netcracker.rest.restservice.model.Place;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.SplittableRandom;

@Slf4j
@Service
public class GoogleMapsService {

    private final GeoApiContext context;
    private static final int LOWER_BOUND_FOR_RANDOM_GEN = 1;
    private static final int UPPER_BOUND_FOR_RANDOM_GEN = 20;
    private static final int MAX_ALLOWED_RADIUS = 50000;
    private static final long AVERAGE_PRICE_OF_GASOLINE = 55;
    // Example from http://www.1gai.ru 48,7 л: 517 км = 0,094 л / 1 км
    private static final double AVERAGE_CONSUMPTION_PER_KM = 0.094;
    private static final long METERS_PER_KM = 1000;

    @Autowired
    public GoogleMapsService(GeoApiContext context) {
        this.context = context;
    }

    /**
     * Finds a random Place within a certain radius from the current position.
     * Calculates a price to get to the place found and back.
     *
     * @param lat given latitude
     * @param lng given longitude
     * @return a Place object
     */
    public Place findLuckyPlace(String lat, String lng) throws InterruptedException, ApiException, IOException {
        LatLng currentPosition = new LatLng(Double.parseDouble(lat), Double.parseDouble(lng));
        PlacesSearchResponse placesSearchResponse = PlacesApi.nearbySearchQuery(context, currentPosition)
                .radius(MAX_ALLOWED_RADIUS).await();
        int placeNumber = getIntRandomNumberInRange(LOWER_BOUND_FOR_RANDOM_GEN, UPPER_BOUND_FOR_RANDOM_GEN);
        // A place within a search response by the generated random number
        PlacesSearchResult result = placesSearchResponse.results[placeNumber];

        // Provides travel distance and time for a matrix of origins and destinations.
        // The information returned is based on the recommended route between start and end points,
        // as calculated by the Google Maps API, and consists of rows containing
        // duration and distance values for each pair.
        DistanceMatrix matrix = DistanceMatrixApi.newRequest(context)
                .origins(currentPosition)
                .destinations(result.geometry.location)
                .await();
        // Using distance value from Matrix in meters
        long priceToGetToPlace = (long) (matrix.rows[0].elements[0].distance.inMeters *
                AVERAGE_PRICE_OF_GASOLINE / METERS_PER_KM * AVERAGE_CONSUMPTION_PER_KM);
        return new Place(result.geometry.location.lat,
                result.geometry.location.lng,
                result.name,
                result.vicinity,
                result.icon,
                matrix.rows[0].elements[0].duration,
                matrix.rows[0].elements[0].distance,
                BigDecimal.valueOf(priceToGetToPlace * 2)
        );
    }

    private static int getIntRandomNumberInRange(int min, int max) {
        return new SplittableRandom().nextInt(min, max);
    }

}
