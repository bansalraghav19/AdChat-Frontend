import React from "react";
import { Route, Redirect } from "react-router-dom";

function index({ isLogged, component: Component, restricted, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !restricted ? (
          <Component {...props} />
        ) : isLogged ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default index;
