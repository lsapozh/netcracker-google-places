package com.netcracker.rest.restservice.model;

import com.google.maps.model.Distance;
import com.google.maps.model.Duration;

import java.math.BigDecimal;
import java.net.URL;

public class Place {
    private double lat;
    private double lng;
    private String name;
    private String address;
    private URL icon;
    private Duration duration;
    private Distance distance;
    private BigDecimal price;

    public Place(double lat, double lng, String name, String address, URL icon, Duration duration, Distance distance, BigDecimal price) {
        this.lat = lat;
        this.lng = lng;
        this.name = name;
        this.address = address;
        this.icon = icon;
        this.duration = duration;
        this.distance = distance;
        this.price = price;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public URL getIcon() {
        return icon;
    }

    public void setIcon(URL icon) {
        this.icon = icon;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public Distance getDistance() {
        return distance;
    }

    public void setDistance(Distance distance) {
        this.distance = distance;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
