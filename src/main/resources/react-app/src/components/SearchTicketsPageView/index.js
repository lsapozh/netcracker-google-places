import React from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TicketsList from '../TicketsList'

const SearchTicketsPageView = ({
    handleChange,
    departureCity,
    arrivalCity,
    departureDate,
    returnDate,
    onSearch,
    tickets,
}) => (
    <Paper style={{ padding: '20px 30px' }}>
        <form style={{ padding: '20px 30px' }}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-end"
                spacing={8}
            >
                <Grid item>
                    <TextField
                        name={'departureCity'}
                        label="From"
                        value={departureCity}
                        onChange={handleChange}
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name={'arrivalCity'}
                        label="To"
                        value={arrivalCity}
                        onChange={handleChange}
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name={'departureDate'}
                        label="Depart"
                        value={departureDate}
                        onChange={handleChange}
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name={'returnDate'}
                        label="Return"
                        value={returnDate}
                        onChange={handleChange}
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <Button
                        color="primary"
                        variant="contained"
                        style={{ marginBottom: '8px' }}
                        onClick={onSearch}
                    >
                        {' '}
                        Search Tickets
                    </Button>
                </Grid>
            </Grid>
        </form>

        {/*{tickets ? <TicketsList tickets={tickets} /> : null}*/}
    </Paper>
)
export default SearchTicketsPageView
