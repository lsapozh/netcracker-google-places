import React from 'react'
import SearchPlacesPage from '../SearchPlacesPage'
import SearchTicketsPage from '../SearchTicketsPage'

import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns'

import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

class App extends React.Component {
    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Router history={history}>
                    <React.Fragment>
                        <Route exact path="/" component={SearchPlacesPage} />
                        <Route
                            path="/search-tickets"
                            component={SearchTicketsPage}
                        />
                    </React.Fragment>
                </Router>
            </MuiPickersUtilsProvider>
        )
    }
}

export default App
