import React from 'react'
import Ticket from '../Ticket'

const TicketsList = ({ tickets }) => {
    return tickets.map((ticket, id) => <Ticket key={id} ticket={ticket} />)
}

export default TicketsList
