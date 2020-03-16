import React, { useState } from 'react';
import { Grid, TextField, Button, Backdrop, CircularProgress, Snackbar, Slide } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const CreateView = () => {
    const [data, setdata] = useState({ name: '', surname: '', age: '' });
    const [saving, setsaving] = useState({});

    const handleSave = () => {
        setsaving({ pending: true });
        
        axios.post('/create', data).then(
            () => setsaving({ pending: false, success: true }),
            err => setsaving({ pending: false, error: err })
        );
    };

    const handleChange = e => {
        const dataCopy = { ...data };
        dataCopy[e.target.name] = e.target.value;

        setdata(dataCopy);
    };

    const handleSnackbarClose = () => {
        setsaving({});
    };

    if (data.success) {
        return <Redirect to="/" />;
    } else
        return (
            <Grid container spacing={5}>
                <Grid item>
                    <TextField onChange={handleChange} value={data.name} label="Name" />
                </Grid>
                <Grid item>
                    <TextField onChange={handleChange} value={data.surname} label="Surname" />
                </Grid>
                <Grid item>
                    <TextField onChange={handleChange} value={data.age} label="Age" />
                </Grid>
                <Button onClick={handleSave} style={{ height: 35, marginTop: 10 }} variant="contained" color="secondary">
                    Save
                </Button>
                <Backdrop style={{ zIndex: 10000 }} open={saving.pending}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Snackbar
                    open={!!saving.error}
                    message="Error create user!"
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    TransitionComponent={props => <Slide {...props} direction="up" />}
                />
            </Grid>
        );
};

export default CreateView;
