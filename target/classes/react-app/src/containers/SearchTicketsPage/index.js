import React, { Component } from 'react'
import Page from '../../components/Page'

class SearchTicketsPage extends Component {
    render() {
        return (
            <Page
                title={'Search Tickets'}
                component={'Coming soon...'}
                dispatch={this.props.dispatch}
            />
        )
    }
}

export default SearchTicketsPage
