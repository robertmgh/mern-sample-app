import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch, Redirect } from 'react-router-dom';
import ListView from '../listView/ListView';
import CreateView from '../createView/CreateView';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
        // padding: 24
    }
}));

const AppRouter = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Switch>
                <Route path="/" exact component={ListView} />
                <Route path="/create" component={CreateView} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default AppRouter;
