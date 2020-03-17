import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Backdrop, CircularProgress, Snackbar, Slide } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const UpsertView = props => {
    const [data, setdata] = useState({ name: '', surname: '', age: '' });
    const [processing, setprocessing] = useState({});

    useEffect(() => {
        if (props.match.params && props.match.params.id) {
            loadData(props.match.params.id);
        }
    }, []);

    const loadData = id => {
        setprocessing({ pending: true });

        axios.get(`api/user/${id}`).then(
            resp => {
                setdata(resp.data);
                setprocessing({ pending: false });
            },
            err => setprocessing({ pending: false, error: err, errorMessage: 'Error load user!' })
        );
    };

    const handleSave = () => {
        setprocessing({ pending: true });

        axios.post('api/user', data).then(
            () => setprocessing({ pending: false, saved: true }),
            err => setprocessing({ pending: false, error: err, errorMessage: 'Error save user!' })
        );
    };

    const handleChange = e => {
        const dataCopy = { ...data };
        dataCopy[e.target.name] = e.target.value;

        setdata(dataCopy);
    };

    const handleSnackbarClose = () => {
        setprocessing({});
    };

    if (data.saved) {
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
                <Backdrop style={{ zIndex: 10000 }} open={!!processing.pending}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Snackbar
                    open={!!processing.error}
                    message={processing.errorMessage}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    TransitionComponent={props => <Slide {...props} direction="up" />}
                />
            </Grid>
        );
};

export default UpsertView;
