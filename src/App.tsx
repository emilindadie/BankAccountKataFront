import React from 'react';
import './App.css';
import AppRouter from './routes/appRoute';
import { getLocalStorageValue } from './utils';
import { AuthState, AuthAction } from './reducers/auth';
import { connect } from 'react-redux';

const App: React.FC = (props: any) => {
  let ignore = false;

  const isAuthenticated = getLocalStorageValue('isAuthenticated');
  React.useEffect(() => {
    if (!props.state.user && isAuthenticated) {
      fetchUser();
    }
    return () => {
      ignore = true;
    };
}, [props.dispatch, isAuthenticated, props.state.user]);

  if (!props.state.user && isAuthenticated) {
    return null;
  }

  return (
    AppRouter(isAuthenticated)
  );

  async function fetchUser() {
    if (!ignore) {
      const user = getLocalStorageValue('user');
      props.dispatch({ type: 'LOAD_USER', user: JSON.parse(user) });
    }
  }
};

const mapStateToProps = (state: AuthState) => {
  return {state};
};

const mapDispatchToProps = (dispatch: React.Dispatch<AuthAction>) => {
  return {
    dispatch: (action: AuthAction) => dispatch(action),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
