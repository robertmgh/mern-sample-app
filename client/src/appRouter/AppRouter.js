import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch, Redirect } from 'react-router-dom';
import ListView from '../listView/ListView';
import UpsertView from '../upsertView/UpsertView';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    }
}));

const AppRouter = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Switch>
                <Route path="/" exact component={ListView} />
                <Route path="/create" component={UpsertView} />
                <Route path="/edit/:id" component={UpsertView} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default AppRouter;
