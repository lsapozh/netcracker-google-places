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
        markers: [],
        useCurrentLocation: false,
        placesNotFound: false,
        disableCurrentLocation: true
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

    clearResults = () => {
        this.removeMarkers()
        this.setState({
            places: [],
            placesNotFound: false
        })
    }

    onSearch = () => {
        this.clearResults()
        fetch(
            `api/places/find?lat=${this.state.initLat()}&lng=${this.state.initLng()}&radius=${
                this.state.radius
            }&duration=${this.state.duration}&type=${this.state.placeType}`,
        )
            .then(response => {
                if (response.status === 500) throw "Places not found"
                return response.json()
            })
            .then(data => this.onDataLoad(data))
            .catch(reason => {
                this.setState({placesNotFound: true })
            })
    }

    onLuckySearch = () => {
        this.clearResults()
        const lat = this.randomInteger(45, 60)
        const lng = this.randomInteger(45, 55)
        fetch(`/api/places/findLucky?lat=${lat}&lng=${lng}`)
            .then(response => {
                if (response.status === 500) throw "Places not found"
                return response.json()
            })
            .then(data => this.onDataLoad(data))
            .catch(reason => this.setState({placesNotFound: true }))
    }

    randomInteger = (min, max) => {
        let rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }

    removeMarkers = () => {
       this.state.markers.forEach(m => m.setMap(null))
    }

    renderPlacesOnMap = places => {
        const bounds = new google.maps.LatLngBounds()
        let markers = []
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
            markers.push(marker)
            bounds.extend(position)
            this.state.map.fitBounds(bounds)
        })
        this.setState({markers})
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
                // script.src = `https://maps.googleapis.com/maps/api/js?key=${
                //     process.env.GOOGLE_KEY
                // }&libraries=places&callback=resolveGoogleMapsPromise`
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD7kYHwzqUSGOKSoTq13TB8iMhgxpDJXj0&libraries=places&callback=resolveGoogleMapsPromise`
                script.async = true
                document.body.appendChild(script)
            })
        }

        // Return a promise for the Google Maps API
        return this.googleMapsPromise
    }

    setCurrentLocation = event => {
        this.setState({ useCurrentLocation: event.target.checked })
        if (event.target.checked) {
            this.setState({
                location: "My location",
                initLat: this.state.currentLatLng.lat,
                initLng: this.state.currentLatLng.lng,
            })
        } else {
            this.setState({
                location: '',
                initLat: null,
                initLng: null,
            })
        }
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

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    const location  = new google.maps.LatLng(pos['lat'], pos['lng']);
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'latLng': location}, (results, status) => {
                        if(status == google.maps.GeocoderStatus.OK) {
                            this.setState({
                                currentLatLng: location,
                                currentLocation: results,
                                disableCurrentLocation: false
                            })
                        }
                    });
                }, (error) => {
                    console.warn(error)
                })
            }


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
                        useCurrentLocation={this.state.useCurrentLocation}
                        handleCheckbox={this.setCurrentLocation}
                        placesNotFound={this.state.placesNotFound}
                        disableCurrentLocation={this.state.disableCurrentLocation}
                    />
                }
            />
        )
    }
}

export default SearchPlacesPage
