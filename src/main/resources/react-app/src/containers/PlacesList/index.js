import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'
import TablePagination from '@material-ui/core/TablePagination'
import PlaceIcon from '@material-ui/icons/Place'

const rows = [
    { id: 'distance', label: 'Distance' },
    { id: 'img', label: '' },
    { id: 'name', label: 'Place' },
    { id: 'address', label: 'Address' },
    { id: 'price', label: 'Price' },
    { id: 'duration', numeric: true, label: 'Duration' },
]

function desc(a, b, orderBy) {
    let cmpValueA
    let cmpValueB
    if (orderBy === 'distance') {
        cmpValueA = a[orderBy].inMeters
        cmpValueB = b[orderBy].inMeters
    } else if (orderBy === 'duration') {
        cmpValueA = a[orderBy].inSeconds
        cmpValueB = b[orderBy].inSeconds
    } else {
        cmpValueA = a[orderBy]
        cmpValueB = b[orderBy]
    }
    if (cmpValueB < cmpValueA) {
        return -1
    }
    if (cmpValueB > cmpValueA) {
        return 1
    }
    return 0
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy)
}

class PlacesTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property)
    }

    render() {
        const { order, orderBy, rowCount } = this.props

        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                padding="dense"
                                sortDirection={
                                    orderBy === row.id ? order : false
                                }
                            >
                                <Tooltip title="Sort" enterDelay={300}>
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        )
                    }, this)}
                </TableRow>
            </TableHead>
        )
    }
}

class PlacesList extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'distance',
        data: [],
        page: 0,
        rowsPerPage: 5,
        isLoading: true,
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.places !== this.props.places) {
            this.setState({ data: nextProps.places })
        }
    }

    componentDidMount() {
        this.setState({
            data: this.props.places,
            isLoading: false,
        })
    }

    handleRequestSort = (event, property) => {
        const orderBy = property
        let order = 'desc'

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc'
        }

        this.setState({ order, orderBy })
    }

    handleChangePage = (event, page) => {
        this.setState({ page })
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value })
    }

    render() {
        const { data, order, orderBy, rowsPerPage, page } = this.state
        return this.state.isLoading ? null : (
            <div>
                <Table>
                    <PlacesTableHead
                        order={order}
                        orderBy={orderBy}
                        rowCount={data.length}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                        {stableSort(data, getSorting(order, orderBy))
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                            )
                            .map((place, i) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={i}
                                    >
                                        <TableCell>
                                            {place.distance.humanReadable}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <PlaceIcon />
                                        </TableCell>
                                        <TableCell>{place.name}</TableCell>
                                        <TableCell>{place.address}</TableCell>
                                        <TableCell>{place.price}</TableCell>
                                        <TableCell>
                                            {place.duration.humanReadable}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        )
    }
}

export default PlacesList
