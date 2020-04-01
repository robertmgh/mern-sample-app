import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, AppBar, ListItem, ListItemIcon, ListItemText, List, Toolbar, Button } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import AppRouter from './appRouter/AppRouter';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
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
        <BrowserRouter basename="/">
            <AppBar position="fixed">
                <Toolbar>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container direction="column" spacing={3} className={classes.root}>
                    <Grid container item direction="row" xs={12}>
                        <Grid item style={{ width: 240 }}>
                            <List>
                                <ListItem button component={Link} to="/">
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="List" />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs="auto">
                            <AppRouter />
                        </Grid>
                    </Grid>
                </Grid>
            </main>
        </BrowserRouter>
    );
}

export default App;
