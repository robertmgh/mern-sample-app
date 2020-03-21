import React, { useState } from 'react';
import { Grid, Typography, Button, Backdrop, CircularProgress, Snackbar, Slide } from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const DeleteView = props => {
    const [processing, setprocessing] = useState({});

    const deleteUser = id => {
        setprocessing({ pending: true });
        axios.delete(`api/user/${id}`).then(
            () => {
                setprocessing({ pending: false, success: true });
                props.history.push('/');
            },
            err => {
                setprocessing({ pending: false, success: false, error: err, errorMessage: 'Delete user fail!' });
            }
        );
    };

    const handleSnackbarClose = () => {
        setprocessing({});
    };

    const onNoClick = () => {
        props.history.push('/');
    };

    const onYesClick = () => {
        deleteUser(props.match.params.id);
    };

    return (
        <Grid container spacing={5} direction="row">
            <Grid item>
                <Typography>Are you sure ?</Typography>
            </Grid>
            <Grid container spacing={5} direction="row">
                <Grid item>
                    <Button onClick={() => onNoClick()} variant="contained" color="secondary">
                        No
                    </Button>
                </Grid>
                <Grid item>
                    <Button onClick={() => onYesClick()} variant="contained" color="secondary">
                        Yes
                    </Button>
                </Grid>
            </Grid>
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

export default withRouter(DeleteView);
