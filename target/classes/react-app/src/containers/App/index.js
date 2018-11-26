import React from 'react'
import SearchPlacesPage from '../SearchPlacesPage'
import SearchTicketsPage from '../SearchTicketsPage'

import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <React.Fragment>
                    <Route exact path="/" component={SearchPlacesPage} />
                    <Route
                        path="/search-tickets"
                        component={SearchTicketsPage}
                    />
                </React.Fragment>
            </Router>
        )
    }
}

export default App
