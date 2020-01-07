import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import './header.css';
import { useStyles } from './style';
import { connect } from 'react-redux';
import { AuthState, AuthAction } from '../../reducers/auth';
import { removeCookie } from '../../utils';

function Header(props: any) {
    const history = useHistory();
    const classes = useStyles();

    function logOut() {
        props.dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('isAuthenticated');
        removeCookie('refresh_token');
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
                <Button color='inherit' className={classes.button} onClick={logOut}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}

const mapStateToProps = (state: AuthState) => {
    return {state};
};

const mapDispatchToProps = (dispatch: React.Dispatch<AuthAction>) => {
    return {
        dispatch: (action: AuthAction) => dispatch(action),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
