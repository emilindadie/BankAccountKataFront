import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    BrowserRouter,
    Redirect,
} from 'react-router-dom';
import Login from '../components/login/login';
import { PrivateRoute } from './protected';
import Home from '../components/home/home';
import Header from '../components/header/header';
import { PublicRoute } from './public';
import { Register } from '../components/register/register';
import Manage from '../components/manage/manage';
import Operation from '../components/operation/operation';

const AppRouter = (isAuthenticated: boolean) => (
    <BrowserRouter>
        {isAuthenticated ? <Header /> : null}
        <Switch>
            <Route exact path='/'>
                <Redirect to='/login' />
            </Route>
            <PublicRoute isAuthenticated={isAuthenticated} path='/login' component={Login} />
            <PublicRoute isAuthenticated={isAuthenticated} path='/register' component={Register} />
            <PrivateRoute isAuthenticated={isAuthenticated} exact path='/home' component={Home} />
            <PrivateRoute isAuthenticated={isAuthenticated} path='/manage' component={Manage} />
            <PrivateRoute isAuthenticated={isAuthenticated} path='/home/:id/operation' component={Operation} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;
