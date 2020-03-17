import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { Button, Grid } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}));

export default function CheckboxListSecondary() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [data, setdata] = React.useState([{ name: 'Rober', surname: 'Kowalski', age: 33, _id: 1234 }]);

    React.useEffect(() => {
        axios.get('api/user').then(
            resp => setdata(resp.data),
            err => {}
        );
    }, []);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <Grid container direction="column" spacing={5}>
            <Grid item>
                <List dense className={classes.root}>
                    {data.map(row => {
                        const labelId = `checkbox-list-secondary-label-${row._id}`;
                        return (
                            <ListItem key={row._id} button>
                                <ListItemAvatar>
                                    <Avatar alt={`Avatar n°${row._id + 1}`} />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={`${row.name} ${row.surname}`} />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                        onChange={handleToggle(row._id)}
                                        checked={checked.indexOf(row._id) !== -1}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </Grid>
            <Grid item container spacing={5}>
                <Grid item>
                    <Button component={Link} variant="contained" color="secondary" to="/create">
                        Create
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        component={Link}
                        variant="contained"
                        color="secondary"
                        to={checked.length > 0 ? '/edit/' + checked[0] : '#'}
                        disabled={checked.length < 1}
                    >
                        Edit
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary" disabled={checked.length < 1}>
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
