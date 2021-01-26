import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getUserDetails } from "./lib/auth/action";
import DashBoard from "./screens/dashboard/index";
import Login from "./screens/authorization/login/index";
import Register from "./screens/authorization/register/index";
import ErrorPage from "./screens/errorPage/index";
import ResetPassword from "./screens/authorization/resetPassword/index";
import PrivateRoute from "./components/routes/PrivateRoute/index";
import PublicRoute from "./components/routes/PublicRoute/index";
import { logoutUser } from "./screens/authorization/action";
import PropTypes from "prop-types";
import "./App.css";

const App = ({ getUserDetails, isLogged }) => {
  useEffect(() => {
    const getData = async () => {
      await getUserDetails();
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <PrivateRoute
        isLogged={isLogged}
        restricted
        path="/login"
        component={Login}
        exact
      />
      <PrivateRoute
        isLogged={isLogged}
        restricted
        path="/register"
        component={Register}
        exact
      />
      <PrivateRoute
        isLogged={isLogged}
        restricted
        path="/resetpassword"
        component={ResetPassword}
        exact
      />
      <PublicRoute
        component={DashBoard}
        isLogged={isLogged}
        restricted
        path="/"
        exact
      />
      <PrivateRoute component={ErrorPage} />
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  isLogged: state.isLogged.isLogged,
});

export default connect(mapStateToProps, { getUserDetails, logoutUser })(App);
