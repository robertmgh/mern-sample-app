import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Backdrop, CircularProgress, Snackbar, Slide } from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

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
                setdata(resp.data.data);
                setprocessing({ pending: false });
            },
            err => setprocessing({ pending: false, error: err, errorMessage: 'Error load user!' })
        );
    };

    const handleSave = () => {
        setprocessing({ pending: true });

        saveMethod(data).then(
            () => {
                setprocessing({ pending: false, saved: true });
                props.history.push('/');
            },
            err => setprocessing({ pending: false, error: err, errorMessage: 'Error save user!' })
        );
    };

    const saveMethod = data => {
        if (data._id) {
            return axios.put('api/user', data);
        } else {
            return axios.post('api/user', data);
        }
    };

    const handleChange = e => {
        const dataCopy = { ...data };
        dataCopy[e.target.name] = e.target.value;

        setdata(dataCopy);
    };

    const handleSnackbarClose = () => {
        setprocessing({});
    };

    return (
        <Grid container spacing={5}>
            <Grid item>
                <TextField onChange={e => handleChange(e)} value={data.name} name="name" label="Name" />
            </Grid>
            <Grid item>
                <TextField onChange={e => handleChange(e)} value={data.surname} name="surname" label="Surname" />
            </Grid>
            <Grid item>
                <TextField onChange={e => handleChange(e)} value={data.age} name="age" label="Age" />
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

export default withRouter(UpsertView);
