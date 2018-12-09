package com.netcracker.rest.restservice.service;

import com.google.maps.DistanceMatrixApi;
import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.*;
import com.netcracker.rest.restservice.model.Place;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

import static org.joda.time.DateTimeConstants.MINUTES_PER_HOUR;
import static org.joda.time.DateTimeConstants.SECONDS_PER_MINUTE;

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
        LatLng currentPosition = detectCurrentPosition(lat, lng);
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

        DistanceMatrixElement distanceMatrixElement = matrix.rows[0].elements[0];

        return createPlace(result, distanceMatrixElement);
    }

    public List<Place> findPlaces(String lat, String lng, int radius, String type, int duration) throws InterruptedException,
            ApiException, IOException {
        List<Place> places = new ArrayList<>();
        long hoursInSeconds = duration * MINUTES_PER_HOUR * SECONDS_PER_MINUTE;
        LatLng currentPosition = detectCurrentPosition(lat, lng);
        PlacesSearchResponse placesSearchResponse = PlacesApi.nearbySearchQuery(context, currentPosition).
                radius(radius).
                type(PlaceType.valueOf(type.toUpperCase())).
                await();

        places.addAll(filterDuration(placesSearchResponse, currentPosition, hoursInSeconds));
        /*
          A nextPageToken can be used to request up to 20 additional results. This field will be null if
          there are no further results. The maximum number of results that can be returned is 60.
        */
        while (placesSearchResponse != null && placesSearchResponse.nextPageToken != null) {
            placesSearchResponse = PlacesApi.nearbySearchNextPage(context, placesSearchResponse.nextPageToken)
                    .awaitIgnoreError();
            if(placesSearchResponse != null) {
                places.addAll(filterDuration(placesSearchResponse, currentPosition, hoursInSeconds));
            }
        }
        return places;
    }

    private List<Place> filterDuration(PlacesSearchResponse placesSearchResponse, LatLng currentPosition,
                                       long durationInSeconds) throws InterruptedException, ApiException, IOException {
        PlacesSearchResult[] searchResults = placesSearchResponse.results;
        int placesCount = searchResults.length;
        if(placesCount == 0) {
            return Collections.emptyList();
        }
        // An array of locations, represented by a latitude/longitude pairs
        LatLng[] locations = Arrays.stream(searchResults)
                .map(s -> s.geometry.location)
                .toArray(LatLng[]::new);

        DistanceMatrix matrix = DistanceMatrixApi.newRequest(context)
                .origins(currentPosition)
                .destinations(locations)
                .await();

        List<Place> places = new ArrayList<>();
        int i = 0;
        for (PlacesSearchResult result : searchResults) {
            DistanceMatrixElement destinationPlace = matrix.rows[0].elements[i++];
            if (destinationPlace.duration.inSeconds < durationInSeconds) {
                Place place = createPlace(result, destinationPlace);
                places.add(place);
            }
        }
        return places;
    }

    private static long getPriceToGetToPlace(DistanceMatrixElement distanceMatrixElement) {
        return (long) (distanceMatrixElement.distance.inMeters *
                AVERAGE_PRICE_OF_GASOLINE / METERS_PER_KM * AVERAGE_CONSUMPTION_PER_KM);
    }

    private static LatLng detectCurrentPosition(String lat, String lng) {
        return new LatLng(Double.parseDouble(lat), Double.parseDouble(lng));
    }

    private static int getIntRandomNumberInRange(int min, int max) {
        return new SplittableRandom().nextInt(min, max);
    }

    private Place createPlace(PlacesSearchResult result, DistanceMatrixElement destinationPlace) {
        return new Place(result.geometry.location.lat,
                result.geometry.location.lng,
                result.name,
                result.vicinity,
                result.icon,
                destinationPlace.duration,
                destinationPlace.distance,
                BigDecimal.valueOf(getPriceToGetToPlace(destinationPlace) * 2)
        );
    }

}
