import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    BrowserRouter,
    Redirect,
} from 'react-router-dom';
import Login from '../components/login/login';
import Register from '../components/register/register';
import { PrivateRoute } from './protected';
import Home from '../components/home/home';
import { Header } from '../components/header/header';

const AppRouter = (isAuthenticated: boolean) => (
    <BrowserRouter>
        {isAuthenticated ? <Header /> : null}
        <Switch>
            <Route exact path='/'>
                <Redirect to='/login' />
            </Route>
            <Route path='/login' component={Login} />
            <Route component={Register} path='/register' />
            <PrivateRoute isAuthenticated={isAuthenticated} path='/home' component={Home} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;
