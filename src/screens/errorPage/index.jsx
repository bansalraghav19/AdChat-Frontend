import React from "react";
import { Result, Button } from "antd";
import { NavLink } from "react-router-dom";

function index() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <NavLink to="/">
          <Button className="btn" type="primary">
            Back Home
          </Button>
        </NavLink>
      }
    />
  );
}

export default index;
