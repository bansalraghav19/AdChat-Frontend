import React, { useEffect, useState } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Form, Input, Button, message, Spin } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { loginUser } from "../action";
import { getUserDetails } from "../../../lib/auth/action";
import { NavLink } from "react-router-dom";

const Login = ({ loginStatus, loginUser, getUserDetails, isLoading }) => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (values) => {
    setEmail(values.email);
    await loginUser(values);
  };

  useEffect(() => {
    const storeLocal = async () => {
      setEmail("");
      await getUserDetails();
    };
    if (loginStatus.error) {
      message.error(`Wrong username or password`, 3);
    } else if (loginStatus?.data?.success) {
      storeLocal();
    }
  }, [loginStatus]);

  const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

  return isLoading ? (
    <div className="container">
      <Spin indicator={antIcon} />
    </div>
  ) : (
    <div className="centerForm">
      <Form
        name="normal_login"
        className="login-form-login"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Username!" }]}
          initialValue={email}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <NavLink to="/resetpassword">Forgot password</NavLink>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button btn"
          >
            Log in
          </Button>
          Or <NavLink to="/register">register now!</NavLink>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loginStatus: state.authentication.loginUser,
  isLoading: state.setLoader.isLoading,
});

export default connect(mapStateToProps, { loginUser, getUserDetails })(Login);
