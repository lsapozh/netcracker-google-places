import React, { Component } from 'react'
import Page from '../../components/Page'
import SearchPlacesPageView from '../../components/SearchPlacesPageView'

class SearchPlacesPage extends Component {
    state = {
        data: null,
        location: '',
        radius: '',
        duration: '',
        placeType: '',
        initLat: null,
        initLng: null,
    }

    handleChange = event => {
        this.setState({
            [event.target.name]:
                event.target.name === 'radius' ||
                event.target.name === 'duration'
                    ? event.target.value.replace(/[^\d]/g, '')
                    : event.target.value,
        })
    }

    onDataLoad = data => {
        this.setState(
            {
                places: data,
            },
            () => this.renderPlacesOnMap(data),
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.radius !== this.state.radius) {
            if (this.state.radius > 50000) {
                this.setState({
                    radius: 50000,
                })
            }
        }
    }

    onSearch = () => {
        fetch(
            `api/places/find?lat=${this.state.initLat()}&lng=${this.state.initLng()}&radius=${
                this.state.radius
            }&duration=${this.state.duration}&type=${
                this.state.placeType
            }`,
        )
            .then(response => response.json())
            .then(data => this.onDataLoad(data))
    }

    onLuckySearch = () => {
        fetch(`/api/places/findLucky?lat=50&lng=45`)
            .then(response => response.json())
            .then(data => this.onDataLoad(data))
    }

    renderPlacesOnMap = places => {
        const bounds = new google.maps.LatLngBounds()
        places.forEach(p => {
            let contentString = `
                Name: ${p.name}<br>
                Address: ${p.address}
                `
            let position = new google.maps.LatLng(p.lat, p.lng)
            let infoWindow = new google.maps.InfoWindow({
                content: contentString,
            })
            let marker = new google.maps.Marker({
                map: this.state.map,
                position,
                infoWindow,
            })
            marker.addListener('mouseover', () => {
                infoWindow.open(this.state.map, marker)
            })
            marker.addListener('mouseout', () => {
                infoWindow.close(this.state.map, marker)
            })
            bounds.extend(position)
            this.state.map.fitBounds(bounds)
        })
    }

    getGoogleMaps() {
        // If we haven't already defined the promise, define it
        if (!this.googleMapsPromise) {
            this.googleMapsPromise = new Promise(resolve => {
                // Add a global handler for when the API finishes loading
                window.resolveGoogleMapsPromise = () => {
                    // Resolve the promise
                    resolve(google)

                    // Tidy up
                    delete window.resolveGoogleMapsPromise
                }

                // Load the Google Maps API
                const script = document.createElement('script')
                script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_KEY}&libraries=places&callback=resolveGoogleMapsPromise`
                script.async = true
                document.body.appendChild(script)
            })
        }

        // Return a promise for the Google Maps API
        return this.googleMapsPromise
    }

    componentWillMount() {
        // Start Google Maps API loading since we know we'll soon need it
        this.getGoogleMaps()
    }

    componentDidMount() {
        // Once the Google Maps API has finished loading, initialize the map
        this.getGoogleMaps().then(google => {
            const uluru = { lat: 53.2, lng: 50.15 }
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: uluru,
            })
            this.setState({
                map,
            })
            const locationInput = document.getElementById('location-input')
            let autocomplete = new google.maps.places.Autocomplete(
                locationInput,
            )
            autocomplete.bindTo('bounds', map)

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace()
                if (!place.geometry) {
                    return
                }
                this.setState({
                    initLat: place.geometry.location.lat,
                    initLng: place.geometry.location.lng,
                    location: place.name,
                })
            })
        })
    }

    render() {
        return (
            <Page
                title={'Search Places'}
                component={
                    <SearchPlacesPageView
                        location={this.state.location}
                        radius={this.state.radius}
                        duration={this.state.duration}
                        placeType={this.state.placeType}
                        handleChange={this.handleChange}
                        onSearch={this.onSearch}
                        places={this.state.places}
                        onLuckySearch={this.onLuckySearch}
                    />
                }
            />
        )
    }
}

export default SearchPlacesPage
