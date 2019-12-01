import React from 'react';
import './App.css';
import { getLocalStorageValue } from './utils';
import useAuth, { AuthProvider } from './contexts/auth';
import AppRouter from './routes/appRoute';
import { EventEmitter } from 'events';

const App: React.FC = () => {
  let ignore = false;
  const {
    state: { user },
    dispatch,
  } = useAuth();

  const isAuthenticated = getLocalStorageValue('isAuthenticated');

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
    AppRouter(isAuthenticated)
  );

  async function fetchUser() {
    const user = getLocalStorageValue('user');
    if (user && !ignore) {
      dispatch({ type: 'LOAD_USER', user: JSON.parse(user) });
    }
  }
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
