import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    AppBar,
    ListItem,
    ListItemIcon,
    ListItemText,
    List,
    Toolbar,
    Button,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Snackbar,
    Slide
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import AppRouter from './appRouter/AppRouter';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import Axios from 'axios';

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
    toolBarText: {
        flexGrow: 1
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    }
}));

function App() {
    const classes = useStyles();
    const [openLogin, setOpenLogin] = useState(false);
    const [loginData, setLoginData] = useState({ login: '', password: '' });
    const [login, setLogin] = useState({});

    const handleLoginClose = () => {
        setOpenLogin(false);
    };

    const handleLoginOpen = () => {
        setOpenLogin(true);
    };

    const loginDataChange = e => {
        e &&
            e.target &&
            setLoginData({
                ...loginData,
                [e.target.name]: e.target.value
            });
    };

    const handleLoginClick = () => {
        setLogin({ progress: true });

        Axios.post('/login').then(
            resp => {
                setLogin({ progress: false, data: resp });
            },
            error => {
                setLogin({ progress: false, error, errorMessage: 'Failed to login' });
            }
        );
    };

    const handleSnackbarClose = () => {
        setLogin({});
    };

    return (
        <BrowserRouter basename="/">
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" className={classes.toolBarText}>
                        Users
                    </Typography>
                    {login.data ? (
                        <IconButton>
                            <AccountCircle />
                        </IconButton>
                    ) : (
                        <Button color="inherit" onClick={handleLoginOpen}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {login.data ? (
                    <Grid container direction="column" spacing={3} className={classes.root}>
                        <Grid container direction="row" item xs={12}>
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
                ) : null}
            </main>
            <Dialog open={openLogin}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <Grid container spacing={5} direction="column">
                        <Grid item>
                            <TextField
                                disabled={login.progress}
                                onChange={loginDataChange}
                                label="Login"
                                name="login"
                                value={loginData.login}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                disabled={login.progress}
                                onChange={loginDataChange}
                                label="Password"
                                type="password"
                                name="password"
                                value={loginData.password}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button disabled={login.progress} onClick={handleLoginClose}>
                        Cancel
                    </Button>
                    <Button
                        startIcon={login.progress ? <CircularProgress size="small" /> : null}
                        disabled={login.progress}
                        autoFocus
                        onClick={handleLoginClick}
                        color="primary"
                    >
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={!!login.error}
                message={login.errorMessage}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                TransitionComponent={props => <Slide {...props} direction="up" />}
            />
        </BrowserRouter>
    );
}

export default App;
