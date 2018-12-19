import React, { Component } from 'react'
import Page from '../../components/Page'
import SearchPlacesPageView from '../../components/SearchTicketsPageView'

const d =
    '{"Dates":{"OutboundDates":[{"PartialDate":"2018-05-11","QuoteIds":[1],"Price":140.0,"QuoteDateTime":"2018-03-08T20:35:00"},{"PartialDate":"2018-05-16","QuoteIds":[2],"Price":85.0,"QuoteDateTime":"2018-03-06T05:44:00"},{"PartialDate":"2018-05-17","QuoteIds":[3,4,5],"Price":92.0,"QuoteDateTime":"2018-03-05T17:41:00"},{"PartialDate":"2018-05-18","QuoteIds":[6],"Price":130.0,"QuoteDateTime":"2018-03-06T06:18:00"},{"PartialDate":"2018-05-20","QuoteIds":[7],"Price":92.0,"QuoteDateTime":"2018-03-05T04:46:00"},{"PartialDate":"2018-05-21","QuoteIds":[8],"Price":112.0,"QuoteDateTime":"2018-03-01T04:51:00"},{"PartialDate":"2018-05-22","QuoteIds":[9],"Price":152.0,"QuoteDateTime":"2018-03-08T22:17:00"},{"PartialDate":"2018-05-23","QuoteIds":[10],"Price":103.0,"QuoteDateTime":"2018-03-06T02:16:00"},{"PartialDate":"2018-05-24","QuoteIds":[11],"Price":92.0,"QuoteDateTime":"2018-03-05T21:09:00"},{"PartialDate":"2018-05-25","QuoteIds":[12,13,14],"Price":115.0,"QuoteDateTime":"2018-03-04T17:45:00"},{"PartialDate":"2018-05-26","QuoteIds":[15,16,17],"Price":111.0,"QuoteDateTime":"2018-03-02T21:22:00"},{"PartialDate":"2018-05-27","QuoteIds":[18,19,20],"Price":110.0,"QuoteDateTime":"2018-03-06T21:04:00"},{"PartialDate":"2018-05-28","QuoteIds":[21,22,23,24],"Price":93.0,"QuoteDateTime":"2018-03-02T17:47:00"},{"PartialDate":"2018-05-30","QuoteIds":[25],"Price":93.0,"QuoteDateTime":"2018-03-02T03:23:00"},{"PartialDate":"2018-05-31","QuoteIds":[26,27],"Price":91.0,"QuoteDateTime":"2018-03-05T23:47:00"}],"InboundDates":[{"PartialDate":"2018-06-22","QuoteIds":[1],"Price":140.0,"QuoteDateTime":"2018-03-08T20:35:00"},{"PartialDate":"2018-06-07","QuoteIds":[2],"Price":85.0,"QuoteDateTime":"2018-03-06T05:44:00"},{"PartialDate":"2018-06-01","QuoteIds":[3],"Price":98.0,"QuoteDateTime":"2018-03-07T21:07:00"},{"PartialDate":"2018-06-02","QuoteIds":[4,9,11,12,18,21],"Price":92.0,"QuoteDateTime":"2018-03-05T11:37:00"},{"PartialDate":"2018-06-04","QuoteIds":[5,13,26],"Price":91.0,"QuoteDateTime":"2018-03-05T01:56:00"},{"PartialDate":"2018-06-03","QuoteIds":[6,19,22],"Price":130.0,"QuoteDateTime":"2018-03-06T06:18:00"},{"PartialDate":"2018-06-06","QuoteIds":[7],"Price":92.0,"QuoteDateTime":"2018-03-05T04:46:00"},{"PartialDate":"2018-06-11","QuoteIds":[8],"Price":112.0,"QuoteDateTime":"2018-03-01T04:51:00"},{"PartialDate":"2018-06-15","QuoteIds":[10],"Price":103.0,"QuoteDateTime":"2018-03-06T02:16:00"},{"PartialDate":"2018-06-17","QuoteIds":[14,15],"Price":124.0,"QuoteDateTime":"2018-03-02T21:22:00"},{"PartialDate":"2018-06-21","QuoteIds":[16],"Price":117.0,"QuoteDateTime":"2018-03-03T13:08:00"},{"PartialDate":"2018-06-30","QuoteIds":[17],"Price":111.0,"QuoteDateTime":"2018-03-04T23:54:00"},{"PartialDate":"2018-06-10","QuoteIds":[20],"Price":110.0,"QuoteDateTime":"2018-03-06T21:04:00"},{"PartialDate":"2018-06-12","QuoteIds":[23],"Price":1386.0,"QuoteDateTime":"2018-03-05T19:51:00"},{"PartialDate":"2018-06-16","QuoteIds":[24],"Price":93.0,"QuoteDateTime":"2018-03-02T17:47:00"},{"PartialDate":"2018-06-05","QuoteIds":[25,27],"Price":92.0,"QuoteDateTime":"2018-03-02T03:23:00"}]},"Quotes":[{"QuoteId":1,"MinPrice":140.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-11T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-22T00:00:00"},"QuoteDateTime":"2018-03-08T20:35:00"},{"QuoteId":2,"MinPrice":85.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-16T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-07T00:00:00"},"QuoteDateTime":"2018-03-06T05:44:00"},{"QuoteId":3,"MinPrice":98.0,"Direct":true,"OutboundLeg":{"CarrierIds":[1793],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-17T00:00:00"},"InboundLeg":{"CarrierIds":[1793],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-01T00:00:00"},"QuoteDateTime":"2018-03-07T21:07:00"},{"QuoteId":4,"MinPrice":92.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-17T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-02T00:00:00"},"QuoteDateTime":"2018-03-05T17:41:00"},{"QuoteId":5,"MinPrice":118.0,"Direct":true,"OutboundLeg":{"CarrierIds":[1793],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-17T00:00:00"},"InboundLeg":{"CarrierIds":[1793],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-04T00:00:00"},"QuoteDateTime":"2018-03-08T10:45:00"},{"QuoteId":6,"MinPrice":130.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-18T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-03T00:00:00"},"QuoteDateTime":"2018-03-06T06:18:00"},{"QuoteId":7,"MinPrice":92.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-20T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-06T00:00:00"},"QuoteDateTime":"2018-03-05T04:46:00"},{"QuoteId":8,"MinPrice":112.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-21T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-11T00:00:00"},"QuoteDateTime":"2018-03-01T04:51:00"},{"QuoteId":9,"MinPrice":152.0,"Direct":true,"OutboundLeg":{"CarrierIds":[1793],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-22T00:00:00"},"InboundLeg":{"CarrierIds":[1793],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-02T00:00:00"},"QuoteDateTime":"2018-03-08T22:17:00"},{"QuoteId":10,"MinPrice":103.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-23T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-15T00:00:00"},"QuoteDateTime":"2018-03-06T02:16:00"},{"QuoteId":11,"MinPrice":92.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-24T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-02T00:00:00"},"QuoteDateTime":"2018-03-05T21:09:00"},{"QuoteId":12,"MinPrice":115.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-25T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-02T00:00:00"},"QuoteDateTime":"2018-03-05T21:46:00"},{"QuoteId":13,"MinPrice":116.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-25T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-04T00:00:00"},"QuoteDateTime":"2018-03-05T01:56:00"},{"QuoteId":14,"MinPrice":133.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-25T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-17T00:00:00"},"QuoteDateTime":"2018-03-04T17:45:00"},{"QuoteId":15,"MinPrice":124.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-26T00:00:00"},"InboundLeg":{"CarrierIds":[1902],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-17T00:00:00"},"QuoteDateTime":"2018-03-02T21:22:00"},{"QuoteId":16,"MinPrice":117.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-26T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-21T00:00:00"},"QuoteDateTime":"2018-03-03T13:08:00"},{"QuoteId":17,"MinPrice":111.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-26T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-30T00:00:00"},"QuoteDateTime":"2018-03-04T23:54:00"},{"QuoteId":18,"MinPrice":119.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-27T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-02T00:00:00"},"QuoteDateTime":"2018-03-07T04:07:00"},{"QuoteId":19,"MinPrice":134.0,"Direct":true,"OutboundLeg":{"CarrierIds":[1793],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-27T00:00:00"},"InboundLeg":{"CarrierIds":[1793],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-03T00:00:00"},"QuoteDateTime":"2018-03-07T15:02:00"},{"QuoteId":20,"MinPrice":110.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-27T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-10T00:00:00"},"QuoteDateTime":"2018-03-06T21:04:00"},{"QuoteId":21,"MinPrice":171.0,"Direct":true,"OutboundLeg":{"CarrierIds":[1793],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-28T00:00:00"},"InboundLeg":{"CarrierIds":[1793],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-02T00:00:00"},"QuoteDateTime":"2018-03-05T11:37:00"},{"QuoteId":22,"MinPrice":135.0,"Direct":true,"OutboundLeg":{"CarrierIds":[1793],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-28T00:00:00"},"InboundLeg":{"CarrierIds":[1793],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-03T00:00:00"},"QuoteDateTime":"2018-03-09T01:17:00"},{"QuoteId":23,"MinPrice":1386.0,"Direct":false,"OutboundLeg":{"CarrierIds":[],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-28T00:00:00"},"InboundLeg":{"CarrierIds":[1169],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-12T00:00:00"},"QuoteDateTime":"2018-03-05T19:51:00"},{"QuoteId":24,"MinPrice":93.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-28T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-16T00:00:00"},"QuoteDateTime":"2018-03-02T17:47:00"},{"QuoteId":25,"MinPrice":93.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-30T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-05T00:00:00"},"QuoteDateTime":"2018-03-02T03:23:00"},{"QuoteId":26,"MinPrice":91.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-31T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-04T00:00:00"},"QuoteDateTime":"2018-03-07T21:37:00"},{"QuoteId":27,"MinPrice":92.0,"Direct":true,"OutboundLeg":{"CarrierIds":[851],"OriginId":81727,"DestinationId":65368,"DepartureDate":"2018-05-31T00:00:00"},"InboundLeg":{"CarrierIds":[851],"OriginId":65368,"DestinationId":81727,"DepartureDate":"2018-06-05T00:00:00"},"QuoteDateTime":"2018-03-05T23:47:00"}],"Places":[{"PlaceId":65368,"IataCode":"LAX","Name":"Los Angeles International","Type":"Station","SkyscannerCode":"LAX","CityName":"Los Angeles","CityId":"LAXA","CountryName":"United States"},{"PlaceId":81727,"IataCode":"SFO","Name":"San Francisco International","Type":"Station","SkyscannerCode":"SFO","CityName":"San Francisco","CityId":"SFOA","CountryName":"United States"}],"Carriers":[{"CarrierId":851,"Name":"Alaska Airlines"},{"CarrierId":1169,"Name":"Hawaiian Airlines"},{"CarrierId":1793,"Name":"United"},{"CarrierId":1902,"Name":"Southwest Airlines"}],"Currencies":[{"Code":"USD","Symbol":"$","ThousandsSeparator":",","DecimalSeparator":".","SymbolOnLeft":true,"SpaceBetweenAmountAndSymbol":false,"RoundingCoefficient":0,"DecimalDigits":2}]}'
const data = JSON.parse(d)

class SearchTicketsPage extends Component {
    state = {
        departureCity: '',
        arrivalCity: '',
        departureDate: new Date(),
        returnDate: new Date(),
        tickets: null,
        ticketsNotFound: false,
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleDepartDateChange = date => {
        this.setState({ departureDate: date })
    }

    handleReturnDateChange = date => {
        this.setState({ returnDate: date })
    }

    loadData = ({
        departureAirport,
        arrivalAirport,
        departureDateFormat,
        returnDateFormat,
    }) => {
        const url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/${departureAirport}/${arrivalAirport}/${departureDateFormat}/${returnDateFormat}`
        fetch(url, {
            headers: {
                'X-RapidAPI-Key':
                    'Td24bfq18lmsh5KqGTIsh6amrNJRp1h4MngjsnIdn2a8CFcrl5',
            },
        })
            .then(response => response.json())
            .then(data => this.getTickets(data))
            .catch(reason => this.setState({ ticketsNotFound: true }, () => console.log(this.state)))
    }

    getTickets = data => {
        if (data.Quotes.length === 0) {
            this.setState({ ticketsNotFound: true })
        } else {
            let tickets = []
            data.Quotes.map(quote => {
                const price = quote.MinPrice
                const direct = quote.Direct
                const outboundAirline = data.Carriers.find(
                    carrier =>
                        carrier.CarrierId === quote.OutboundLeg.CarrierIds[0],
                )
                const outboundAirlineName = outboundAirline
                    ? outboundAirline.Name
                    : ''
                const inboundAirline = data.Carriers.find(
                    carrier => carrier.CarrierId === quote.InboundLeg.CarrierIds[0],
                )
                const inboundAirlineName = inboundAirline ? inboundAirline.Name : ''
                const departureDate = quote.OutboundLeg.DepartureDate
                const returnDate = quote.InboundLeg.DepartureDate
                const currencySymbol = '$'
                const outboundIataCode = data.Places.find(
                    place => quote.OutboundLeg.DestinationId === place.PlaceId,
                ).IataCode
                const inboundIataCode = data.Places.find(
                    place => quote.InboundLeg.DestinationId === place.PlaceId,
                ).IataCode
                const outboundPlaceName = data.Places.find(
                    place => quote.OutboundLeg.DestinationId === place.PlaceId,
                ).Name
                const inboundPlaceName = data.Places.find(
                    place => quote.InboundLeg.DestinationId === place.PlaceId,
                ).Name
                const ticket = {
                    price,
                    direct,
                    outboundAirline: outboundAirlineName,
                    inboundAirline: inboundAirlineName,
                    departureDate,
                    returnDate,
                    currencySymbol,
                    inboundIataCode,
                    outboundIataCode,
                    outboundPlaceName,
                    inboundPlaceName,
                }
                tickets.push(ticket)
            })
            this.setState({ tickets })
        }

    }

    formatDate = date => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
    }

    getAirportId = name => {
        const url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${name}`
        return fetch(url, {
            headers: {
                'X-RapidAPI-Key':
                    'Td24bfq18lmsh5KqGTIsh6amrNJRp1h4MngjsnIdn2a8CFcrl5',
            },
        })
            .then(response => response.json())
            .then(data => data.Places[0].PlaceId)
    }

    // onSearch = () => {
    //     this.getTickets(data)
    // }

    onSearch = () => {
        const departureDateFormat = this.formatDate(this.state.departureDate)
        const returnDateFormat = this.formatDate(this.state.returnDate)

        Promise.all([
            this.getAirportId(this.state.departureCity),
            this.getAirportId(this.state.arrivalCity),
        ]).then(([departureAirport, arrivalAirport]) => {
            this.loadData({
                departureAirport,
                arrivalAirport,
                departureDateFormat,
                returnDateFormat,
            })
        })
    }

    // onSearch2 = async () => {
    //     const departureDateFormat = this.formatDate(this.state.departureDate)
    //     const returnDateFormat = this.formatDate(this.state.returnDate)
    //
    //     const [departureAirport, arrivalAirport] = await Promise.all([
    //         this.getAirportId(this.state.departureCity),
    //         this.getAirportId(this.state.arrivalCity)
    //     ])
    //     this.loadData({
    //         departureAirport,
    //         arrivalAirport,
    //         departureDateFormat,
    //         returnDateFormat,
    //     })
    // }

    render() {
        return (
            <Page
                title={'Search Tickets'}
                component={
                    <SearchPlacesPageView
                        tickets={this.state.tickets}
                        handleChange={this.handleChange}
                        handleDepartDateChange={this.handleDepartDateChange}
                        handleReturnDateChange={this.handleReturnDateChange}
                        departureCity={this.state.departureCity}
                        arrivalCity={this.state.arrivalCity}
                        departureDate={this.state.departureDate}
                        returnDate={this.state.returnDate}
                        onSearch={this.onSearch}
                        ticketsNotFound={this.state.ticketsNotFound}
                    />
                }
                dispatch={this.props.dispatch}
            />
        )
    }
}

export default SearchTicketsPage
