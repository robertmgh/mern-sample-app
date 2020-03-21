import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, ListItem, ListItemIcon, ListItemText, List, Divider, Drawer, Toolbar } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import AppRouter from './appRouter/AppRouter';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    }
}));

function App() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BrowserRouter basename="/">
                <AppBar position="fixed">
                    <Toolbar></Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <List>
                        <ListItem button component={Link} to="/">
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="List" />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <AppRouter />
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
