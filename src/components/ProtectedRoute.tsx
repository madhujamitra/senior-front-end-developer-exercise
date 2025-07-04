import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const { user } = useAuth();
  if (!Component) return null;
  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute; 