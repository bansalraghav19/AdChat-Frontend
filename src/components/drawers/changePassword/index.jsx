import React, { useState, useEffect, useRef } from "react";
import { Drawer, Button, Form, Input, message } from "antd";
import { connect } from "react-redux";
import "./index.css";
import { changePassword } from "../../../screens/dashboard/action";

import { LeftOutlined, LockOutlined } from "@ant-design/icons";

const Index = ({
  setChangePasswordDrawer,
  changePasswordDrawer,
  changePassword,
  changePasswordStatus,
  mWeb
}) => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    if (changePasswordStatus?.error) {
      if (changePasswordStatus?.data?.data?.message) {
        message.error(`${changePasswordStatus?.data?.data?.message}`);
        setLoading(false);
        formRef.current?.resetFields();
      }
    } else {
      if (typeof changePasswordStatus?.data?.success !== "undefined") {
        if (changePasswordStatus?.data?.success) {
          message.success("Password Changed");
          setChangePasswordDrawer(false);
        } else {
          message.error(`${changePasswordStatus?.data?.data?.message}`);
        }
        setLoading(false);
        formRef.current?.resetFields();
      }
    }
  }, [changePasswordStatus]);

  const submitHandler = async (values) => {
    setLoading(true);
    const formData = { ...values };
    formData.confirmPassword = undefined;
    await changePassword(formData);
  };

  const notificationHeader = (
    <div style={{ display: "flex", alignContent: "center" }}>
      <Button
        onClick={() => setChangePasswordDrawer(false)}
        type="text"
        icon={<LeftOutlined />}
      />
      <span style={{ alignSelf: "center", margin: "0 auto" }}>
        Change Password
      </span>
    </div>
  );

  return (
    <Drawer
      className="changePassword"
      title={notificationHeader}
      placement="right"
      closable={false}
      onClose={() => {
        formRef.current?.resetFields();
        setChangePasswordDrawer(false);
      }}
      visible={changePasswordDrawer}
      placement={"left"}
      width={mWeb ? "100%" : "30%"}
    >
      <Form
        ref={formRef}
        onFinish={(values) => submitHandler(values)}
        className="formC"
      >
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Current Password"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            () => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject("Please input your Password!");
                }
                if (value.length < 6) {
                  return Promise.reject("Minimum length of password must be 6");
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
                if (!value || getFieldValue("newPassword") === value) {
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
        <div style={{ display: "flex" }}>
          <Button
            style={{ margin: "0 auto" }}
            htmlType="submit"
            className="btn"
            type="primary"
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

const mapStatetoProps = (state) => ({
  changePasswordStatus: state.dashBoard.changePassword,
});

export default connect(mapStatetoProps, { changePassword })(React.memo(Index));
