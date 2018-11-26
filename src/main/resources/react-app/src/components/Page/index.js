import React from 'react'
import { Link } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AirplaneIcon from '@material-ui/icons/AirplanemodeActive'
import PlaceIcon from '@material-ui/icons/Place'

export const Page = ({ title, component }) => {
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        style={{ marginLeft: '230px' }}
                    >
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" anchor="left">
                <div />
                <Divider />
                <List>
                    <Link to={'/'} style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <PlaceIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Search Places'} />
                        </ListItem>
                    </Link>
                    <Link
                        to={'/search-tickets'}
                        style={{ textDecoration: 'none' }}
                    >
                        <ListItem button>
                            <ListItemIcon>
                                <AirplaneIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Search Tickets'} />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
            <main style={{ marginTop: '90px', marginLeft: '230px' }}>
                {component}
            </main>
        </div>
    )
}

export default Page
