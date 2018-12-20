import React from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import PlacesList from '../../containers/PlacesList'
import PLACE_TYPES from '../../constants/places'
import Checkbox from '@material-ui/core/Checkbox/Checkbox'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export const LocationInput = ({ location, handleChange }) => (
    <TextField
        autoComplete={'on'}
        id={'location-input'}
        name={'location'}
        label="Location"
        value={location}
        onChange={handleChange}
        margin="normal"
        fullWidth
    />
)

const SearchPlacesPageView = ({
    location,
    radius,
    duration,
    placeType,
    handleChange,
    onSearch,
    places,
    onLuckySearch,
    useCurrentLocation,
    handleCheckbox,
    placesNotFound,
    disableCurrentLocation,
}) => (
    <Paper style={{ padding: '20px 30px' }}>
        <form style={{ padding: '20px 30px' }}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={useCurrentLocation}
                        onChange={handleCheckbox}
                        value="useCurrentLocation"
                        disabled={disableCurrentLocation}
                    />
                }
                label="Use current location"
            />
            <LocationInput location={location} handleChange={handleChange} />
            <TextField
                name={'radius'}
                label="Radius (m)"
                value={radius}
                onChange={handleChange}
                margin="normal"
                fullWidth
            />
            <TextField
                name={'duration'}
                label="Duration (h)"
                value={duration}
                onChange={handleChange}
                margin="normal"
                fullWidth
                style={{ marginBottom: '30px' }}
            />
            <InputLabel htmlFor="placeType-simple">Place Type</InputLabel>
            <Select
                value={placeType}
                onChange={handleChange}
                inputProps={{
                    name: 'placeType',
                    id: 'placeType-simple',
                }}
                fullWidth
                style={{ marginBottom: '30px' }}
            >
                {PLACE_TYPES.map((place, i) => (
                    <MenuItem key={i} value={place.value}>
                        {place.name}
                    </MenuItem>
                ))}
            </Select>
            <Grid
                container
                direction="row"
                justify="space-between"
                spacing={16}
            >
                <Grid item style={{ width: '50%' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onSearch}
                        style={{ width: '100%' }}
                    >
                        Search
                    </Button>
                </Grid>
                <Grid item style={{ width: '50%' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onLuckySearch}
                        style={{ width: '100%' }}
                    >
                        I'm lucky!
                    </Button>
                </Grid>
            </Grid>
        </form>
        <div id="map" style={{ height: 600, margin: '20px 30px' }} />

        {places ? <PlacesList places={places} /> : null}
        {placesNotFound ? (
            <Typography
                component="h2"
                variant="display1"
                style={{ padding: 30 }}
            >
                Places not found
            </Typography>
        ) : null}
    </Paper>
)
export default SearchPlacesPageView
