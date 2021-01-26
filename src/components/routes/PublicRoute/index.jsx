import React from "react";
import { Route, Redirect } from "react-router-dom";

function index({ isLogged, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLogged ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
}

export default index;
