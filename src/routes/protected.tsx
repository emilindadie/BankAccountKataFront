import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ ...rest }) => (
    rest.isAuthenticated ? <Route {...rest} Component {...rest.component} /> : <Redirect to='/login' />
);
