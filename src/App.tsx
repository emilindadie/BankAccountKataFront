import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from 'react-router-dom';
import { getLocalStorageValue } from './utils';
import useAuth, { AuthProvider } from './contexts/auth';
import { Index } from './components/index';

const App: React.FC = () => {
  let ignore = false;
  const {
    state: { user, isAuthenticated },
    dispatch,
  } = useAuth();

  React.useEffect(() => {
    if (!user && isAuthenticated) {
      fetchUser();
    }
    return () => {
      ignore = true;
    };
  }, [dispatch, isAuthenticated, user]);

  if (!user && isAuthenticated) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/index' />
        </Route>
        <Route path='/index' component={Index} />
      </Switch>
    </BrowserRouter>
  );

  async function fetchUser() {
    const user = getLocalStorageValue('user');
    if (user && !ignore) {
      dispatch({ type: 'LOAD_USER', user });
    }
  }
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
