import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import './header.css';
import { useStyles } from './style';
import useAuth from '../../contexts/auth';

export function Header() {
    const {
        state: { user },
        dispatch,
    } = useAuth();

    const history = useHistory();
    const classes = useStyles();

    function logOut() {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        history.push('/');
    }

    return (
        <AppBar position='static' elevation={0} className={classes.appBar}>
            <Toolbar>
                <Button color='inherit'>
                    <Typography variant='h6' className={classes.menuItem}>
                        <NavLink exact={false} activeClassName={classes.isactive} to='/home'>Consult</NavLink>
                    </Typography>
                </Button>
                <Button color='inherit'>
                    <Typography variant='h6' className='ee'>
                        <NavLink exact={true} activeClassName={classes.isactive} to='/manage'>Manage</NavLink>
                    </Typography>
                </Button>
                <Button color='inherit' className={classes.button} onClick={logOut}>Disconnect</Button>
            </Toolbar>
        </AppBar>
    );
}
