import React from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TicketsList from '../TicketsList'
import { DatePicker } from 'material-ui-pickers'

const SearchTicketsPageView = ({
    handleChange,
    handleDepartDateChange,
    handleReturnDateChange,
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
                    <DatePicker
                        keyboard
                        format="dd/MM/yyyy"
                        placeholder="10/10/2018"
                        mask={value =>
                            value
                                ? [
                                      /\d/,
                                      /\d/,
                                      '/',
                                      /\d/,
                                      /\d/,
                                      '/',
                                      /\d/,
                                      /\d/,
                                      /\d/,
                                      /\d/,
                                  ]
                                : []
                        }
                        value={departureDate}
                        onChange={handleDepartDateChange}
                        name={'departureDate'}
                        label={'Depart'}
                        showTodayButton
                        animateYearScrolling
                    />
                </Grid>
                <Grid item>
                    <DatePicker
                        keyboard
                        format="dd/MM/yyyy"
                        placeholder="10/10/2018"
                        mask={value =>
                            value
                                ? [
                                      /\d/,
                                      /\d/,
                                      '/',
                                      /\d/,
                                      /\d/,
                                      '/',
                                      /\d/,
                                      /\d/,
                                      /\d/,
                                      /\d/,
                                  ]
                                : []
                        }
                        value={returnDate}
                        onChange={handleReturnDateChange}
                        name={'returnDate'}
                        label={'Return'}
                        showTodayButton
                        animateYearScrolling
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
