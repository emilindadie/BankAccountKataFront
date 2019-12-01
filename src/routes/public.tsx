import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ ...rest }) => (
    !rest.isAuthenticated ?
        <Route {...rest} Component {...rest.component} /> : <Redirect to='/home' />
);
