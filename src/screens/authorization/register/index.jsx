import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Input, Button, Spin, message, Modal } from "antd";
import { LoadingOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import Recaptcha from "react-recaptcha";
import { registerUser, checkAvailable, sendEmailOtp } from "../action";
import { getUserDetails } from "../../../lib/auth/action";

const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register = ({
  registerUser,
  isLoading,
  registerStatus,
  getUserDetails,
  checkAvailable,
  checkEmailStatus,
  sendEmailOtp,
  sendEmailOtpData,
}) => {
  const [showLoading, setShowLoading] = useState(true);
  const [isRecaptcha, setIsRecaptcha] = useState(false);

  const [formData, setFormData] = useState(null);
  const [otpModal, setOtpModal] = useState(false);

  const [curOtp, setCurOtp] = useState("");

  const otpField = useRef();

  const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

  const reCaptchaHandler = (response) => {
    if (response) {
      setIsRecaptcha(true);
    }
  };

  const hashCode = (s) => {
    return s.split("").reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  };

  const submitHandler = async (values) => {
    const userData = values;
    delete userData["verification"];
    setFormData(userData);
    setOtpModal(true);
    await sendEmailOtp({ email: userData.email });
  };

  useEffect(() => {
    if (sendEmailOtpData?.data?.success && otpModal) {
      message.success(`One Time Password Send to ${formData.email}`, 3);
      setCurOtp(sendEmailOtpData?.data?.data?.OTP);
    }
  }, [sendEmailOtpData]);

  useEffect(() => {
    if (otpModal) {
      otpField.current.focus();
    }
  }, [otpModal]);

  const validateEmail = (email) => {
    return regex.test(String(email).toLowerCase());
  };

  const checkAvailableHandler = async (event) => {
    await checkAvailable({ email: event.target.value });
  };

  const registerSubmitHandler = async () => {
    const otpEntered = otpField.current.state.value;
    if (!otpEntered || !otpEntered.length) {
      message.error("Please Enter your One-Time Password");
    } else if (hashCode(otpEntered) !== curOtp) {
      message.error("Entered One-Time Password is Wrong, Try again");
    } else if (hashCode(otpEntered) === curOtp) {
      await registerUser(formData);
    }
  };

  useEffect(() => {
    const storeLocal = async () => {
      await getUserDetails();
    };
    if (registerStatus.error) {
      message.error(`User with same E-mail already Exists`, 3);
    } else if (registerStatus?.data?.success) {
      storeLocal();
    }
  }, [registerStatus]);

  return isLoading ? (
    <div className="centerForm">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} size />} />
    </div>
  ) : (
    <>
      {otpModal && (
        <Modal
          className="registerModal"
          footer={null}
          visible={otpModal}
          onCancel={() => setOtpModal(false)}
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
        <Form
          onFinish={submitHandler}
          name="normal_login"
          className="login-form"
          scrollToFirstError
        >
          <Form.Item
            name="email"
            rules={[
              () => ({
                async validator(_, value) {
                  if (!value) {
                    return Promise.reject("Please input your E-mail!");
                  } else if (!validateEmail(value)) {
                    return Promise.reject("The input is not valid E-mail!");
                  } else if (checkEmailStatus?.data?.isAvailable) {
                    return Promise.reject(
                      "Email Already Exists, Try with another"
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onBlur={(event) => checkAvailableHandler(event)}
            />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Full Name"
            />
          </Form.Item>
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
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            className="recaptcha_field"
            name="verification"
            rules={[
              () => ({
                validator() {
                  if (!isRecaptcha) {
                    return Promise.reject("Please complete the Recaptcha");
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <div className={showLoading ? "hidden" : "notHidden"}>
              <Recaptcha
                sitekey="6LdcnicaAAAAAIDwoy9gRKOcn2KmwzWK1lIKBeIC"
                render="explicit"
                verifyCallback={reCaptchaHandler}
                expiredCallback={() => setIsRecaptcha(false)}
                onloadCallback={() => setShowLoading(false)}
              />
            </div>
            {showLoading && <Spin className="spinner" indicator={antIcon} />}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button btn"
            >
              Create Account
            </Button>
            Or <NavLink to="/login">login</NavLink>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  registerStatus: state.authentication.registerUser,
  isLoading: state.setLoader.isLoading,
  checkEmailStatus: state.authentication.checkAvailable.data,
  sendEmailOtpData: state.authentication.sendEmailOtp,
});

export default connect(mapStateToProps, {
  registerUser,
  getUserDetails,
  checkAvailable,
  sendEmailOtp,
  sendEmailOtp,
})(Register);
