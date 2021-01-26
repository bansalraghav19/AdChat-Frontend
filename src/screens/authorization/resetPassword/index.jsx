import React, { useEffect, useState, useRef } from "react";
import { Button, Form, Input, Spin, message, Modal } from "antd";
import { connect } from "react-redux";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import {
  checkAvailable,
  sendEmailOtp,
  resetPassword,
  clearResetData,
} from "../action";
import "./index.css";

function Index({
  isLoading,
  checkAvailable,
  checkEmailStatus,
  sendEmailOtp,
  sendEmailOtpData,
  resetPassword,
  resetPasswordStatus,
  clearResetData,
  history,
}) {
  const [email, setEmail] = useState("");
  const [toggle, setToggle] = useState(true);
  const [loader, setLoader] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [curOtp, setCurOtp] = useState("");
  const otpField = useRef();
  const formRef = useRef();

  const submitHandler = async () => {
    setLoader(true);
    await checkAvailable({ email });
  };

  const sendOtp = async () => {
    setOtpModal(true);
    await sendEmailOtp({ email });
  };

  useEffect(() => {
    if (!checkEmailStatus?.isLoading) {
      if (typeof checkEmailStatus?.data?.data !== "undefined") {
        if (checkEmailStatus?.data?.data?.isAvailable) {
          sendOtp();
        } else {
          message.error("Email is not registered", 5);
        }
        setLoader(false);
      }
    }
  }, [checkEmailStatus]);

  const finalSubmit = async (values) => {
    setLoader(true);
    const data = { ...values };
    data.confirmPassword = undefined;
    data.email = email;
    await resetPassword(data);
  };

  useEffect(() => {
    if (!resetPasswordStatus?.isLoading) {
      if (typeof resetPasswordStatus?.data?.data !== "undefined") {
        if (resetPasswordStatus?.data?.success) {
          message.success(
            "Password Reset successfully, Redirecting to login Page",
            2
          );
          setTimeout(() => {
            clearResetData();
            history.push("/login");
          }, 3000);
        } else {
          message.error("There was some problem, try again", 2);
          setLoader(false);
          formRef.current?.resetFields();
        }
      }
    }
  }, [resetPasswordStatus]);

  const hashCode = (s) => {
    return s.split("").reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  };

  const registerSubmitHandler = async () => {
    const otpEntered = otpField.current.state.value;
    if (!otpEntered || !otpEntered.length) {
      message.error("Please Enter your One-Time Password");
    } else if (hashCode(otpEntered) !== curOtp) {
      message.error("Entered One-Time Password is Wrong, Try again");
    } else if (hashCode(otpEntered) === curOtp) {
      setOtpModal(false);
      setToggle(!toggle);
    }
  };

  useEffect(() => {
    if (sendEmailOtpData?.data?.success && otpModal) {
      message.success(`One Time Password Send to ${email}`, 3);
      setCurOtp(sendEmailOtpData?.data?.data?.OTP);
    }
  }, [sendEmailOtpData]);

  const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

  return isLoading ? (
    <div className="container">
      <Spin indicator={antIcon} />
    </div>
  ) : (
    <>
      {otpModal && (
        <Modal
          className="registerModal"
          footer={null}
          visible={otpModal}
          onCancel={() => {
            setOtpModal(false);
            setLoader(false);
          }}
        >
          {sendEmailOtpData?.loading ? (
            <div className="centerAlign">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 30 }} size />}
              />
            </div>
          ) : (
            <>
              <Input
                placeholder="Enter 6-digit OTP"
                bordered={false}
                maxLength={6}
                ref={otpField}
              />
              <Button
                onClick={registerSubmitHandler}
                className="btn"
                type="primary"
              >
                Submit
              </Button>
            </>
          )}
        </Modal>
      )}
      <div className="centerForm">
        {toggle ? (
          <Form
            onFinish={submitHandler}
            name="normal_login"
            className="login-form-login resetPage"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "Please enter valid Email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </Form.Item>
            <div>
              <Button
                style={{ width: "100%" }}
                htmlType="submit"
                className="btn"
                type="primary"
                loading={loader}
              >
                Reset Password
              </Button>
              Or <NavLink to="/login">login</NavLink>
            </div>
          </Form>
        ) : (
          <Form
            onFinish={(values) => finalSubmit(values)}
            name="password_login"
            className="login-form-login resetPage"
            ref={formRef}
          >
            <Form.Item
              name="password"
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject("Please input your Password!");
                    }
                    if (value.length < 6) {
                      return Promise.reject(
                        "Minimum length of password must be 6"
                      );
                    }
                    if (
                      value.length > 0 &&
                      (value[0] === " " || value[value.length - 1] === " ")
                    ) {
                      return Promise.reject(
                        "Password cannot start or end with spaces"
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="New Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>
            <div>
              <Button
                style={{ width: "100%" }}
                htmlType="submit"
                className="btn"
                type="primary"
                loading={loader}
              >
                Update Password
              </Button>
            </div>
          </Form>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  loginStatus: state.authentication.loginUser,
  isLoading: state.setLoader.isLoading,
  checkEmailStatus: state.authentication.checkAvailable,
  sendEmailOtpData: state.authentication.sendEmailOtp,
  resetPasswordStatus: state.authentication.resetPassword,
});

export default connect(mapStateToProps, {
  checkAvailable,
  sendEmailOtp,
  resetPassword,
  clearResetData,
})(Index);
