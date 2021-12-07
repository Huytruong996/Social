import { Route, Redirect } from "react-router-dom";

import Auth from "../pages/Auth/Auth";

export const ProtectedRoute = ({ component, auth, ...rest }) => {
  return (
    <Route {...rest} render={() => (auth ? component : <Redirect to="/" />)} />
  );
};

export const RouteAuth = ({ component, auth, isLoading, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) {
          // not logged in so redirect to login page with the return url
          return component;
        }
        // logged in so return component
        return <Auth />;
      }}
    />
  );
};
