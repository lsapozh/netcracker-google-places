import React from 'react'
import Paper from '@material-ui/core/Card/Card'
import ArrowForward from '@material-ui/icons/ArrowForward'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const FlightInformation = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
`

const Airline = styled.div`
    width: 25%;
`

const Price = styled.div`
    width: 20%;
`

const FlightInformationContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin: 20px 0;
`

const Flights = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const PlacesContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`
const PlaceContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Ticket = ({ ticket }) => {
    const {
        price,
        direct,
        outboundAirline,
        inboundAirline,
        departureDate,
        returnDate,
        outboundIataCode,
        inboundIataCode,
        outboundPlaceName,
        inboundPlaceName,
        currencySymbol,
    } = ticket

    const departureDateFormatted = `${new Date(
        departureDate,
    ).getDate()}/${new Date(departureDate).getMonth() + 1}/${new Date(
        departureDate,
    ).getFullYear()}`
    const returnDateFormatted = `${new Date(returnDate).getDate()}/${new Date(
        returnDate,
    ).getMonth() + 1}/${new Date(returnDate).getFullYear()}`
    return (
        <Paper
            style={{
                margin: '20px 0',
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                border: 'solid 1px #3f51b5',
            }}
        >
            <Flights>
                <FlightInformationContainer>
                    <Airline>{outboundAirline}</Airline>
                    <FlightInformation>
                        <Typography variant="h6">
                            {' '}
                            {departureDateFormatted}{' '}
                        </Typography>
                        <PlacesContainer>
                            <PlaceContainer>
                                <Typography variant="body1">
                                    {outboundPlaceName}
                                </Typography>
                                <Typography variant="h5">
                                    {outboundIataCode}
                                </Typography>
                            </PlaceContainer>
                            <ArrowForward style={{ width: '10%' }} />
                            <PlaceContainer>
                                <Typography variant="body1">
                                    {inboundPlaceName}
                                </Typography>
                                <Typography variant="h5">
                                    {inboundIataCode}
                                </Typography>
                            </PlaceContainer>
                        </PlacesContainer>
                    </FlightInformation>
                </FlightInformationContainer>

                <FlightInformationContainer>
                    <Airline>{inboundAirline}</Airline>
                    <FlightInformation>
                        <Typography variant="h6">
                            {' '}
                            {returnDateFormatted}{' '}
                        </Typography>
                        <PlacesContainer>
                            <PlaceContainer>
                                <Typography variant="body1">
                                    {inboundPlaceName}
                                </Typography>
                                <Typography variant="h5">
                                    {inboundIataCode}
                                </Typography>
                            </PlaceContainer>
                            <ArrowForward style={{ width: '10%' }} />
                            <PlaceContainer>
                                <Typography variant="body1">
                                    {outboundPlaceName}
                                </Typography>
                                <Typography variant="h5">
                                    {outboundIataCode}
                                </Typography>
                            </PlaceContainer>
                        </PlacesContainer>
                    </FlightInformation>
                </FlightInformationContainer>
            </Flights>

            <Price>
                <Typography component="h3" variant="display1">
                    {currencySymbol} {price}
                </Typography>
            </Price>
        </Paper>
    )
}

export default Ticket
