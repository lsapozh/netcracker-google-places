package com.netcracker.rest.restservice.controller;

import com.google.maps.errors.ApiException;
import com.netcracker.rest.restservice.model.Place;
import com.netcracker.rest.restservice.service.GoogleMapsService;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.TransportAddress;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.transport.client.PreBuiltTransportClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.InetAddress;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;

@RestController
@RequestMapping(value = "api/places")
public class GoogleMapsController {
    private static final String LUCKY_INDEX = "lucky_index";
    private static final String LUCKY_PLACE_TYPE = "luckyPlace";
    private static final String PLACE_INDEX = "place_index";
    private static final String PLACES_TYPE = "places";

    private final GoogleMapsService googleMapsService;

    @Autowired
    public GoogleMapsController(GoogleMapsService googleMapsService) {
        this.googleMapsService = googleMapsService;
    }

    @RequestMapping(value = "findLucky", method = RequestMethod.GET)
    public List<Place> findLuckyPlace(@RequestParam(name = "lat") String lat,
                                      @RequestParam(name = "lng") String lng,
                                      HttpServletRequest request) throws InterruptedException, ApiException, IOException {

        Place luckyPlace = googleMapsService.findLuckyPlace(lat, lng);

        // building an object for ElasticSearch
        XContentBuilder json = null;
        try {
            json = jsonBuilder()
                    .startObject()
                    .field("luckyPlaceAddress", luckyPlace.getAddress())
                    .field("luckyPlaceName", luckyPlace.getName())
                    .field("date", new Date())
                    .field("IP", request.getLocalAddr())
                    .endObject();
        } catch (Exception e) {
            e.printStackTrace();
        }

        // logging to ElasticSearch
        loggingData(json, LUCKY_PLACE_TYPE, LUCKY_INDEX);

        return Collections.singletonList(luckyPlace);
    }

    @RequestMapping(value = "find", method = RequestMethod.GET)
    public List<Place> findPlaces(@RequestParam(name = "lat") String lat,
                                  @RequestParam(name = "lng") String lng,
                                  @RequestParam(name = "radius", defaultValue = "10000") Integer radius,
                                  @RequestParam(name = "duration", defaultValue = "10") Integer duration,
                                  @RequestParam(name = "type") String type,
                                  HttpServletRequest request) throws InterruptedException,
            ApiException, IOException {

        List<Place> places = googleMapsService.findPlaces(lat, lng, radius, type, duration);

        Place place = places.stream().min(Comparator.comparing(Place::getPrice)).get();

        try {
            XContentBuilder json = jsonBuilder()
                    .startObject()
                    .field("placesListSize", places.size())
                    .field("Place with the lowest price", place.getName())
                    .field("The lowest price", place.getPrice())
                    .field("date", new Date())
                    .field("IP", request.getLocalAddr())
                    .endObject();
            Thread secondThread = new Thread(() -> loggingData(json, PLACES_TYPE, PLACE_INDEX));
            secondThread.start();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return places;
    }

    //loggingData
    private void loggingData(XContentBuilder json, String type, String index) {
        TransportClient client = null;
        try {
            client = new PreBuiltTransportClient(Settings.EMPTY)
                    .addTransportAddress(new TransportAddress(InetAddress.getByName("127.0.0.1"), 9300));
        } catch (Exception e) {
            e.printStackTrace();
        }

        prepareElasticIndex(json, type, client, index);
        if (client != null) {
            client.close();
        }
    }

    private void prepareElasticIndex(XContentBuilder json, String type, TransportClient client, String index) {
        try {
            assert client != null;
            IndexResponse response = client.prepareIndex(index, type)
                    .setSource(json)
                    .get();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
