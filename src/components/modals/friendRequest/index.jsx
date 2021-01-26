import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Spin, message } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";
import "./index.css";
import SocketContext from "../../../contexts/SocketContext";

// addfriendresponse
// addfriend

const Index = ({ setClose }) => {
  const io = React.useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    io.on("addfriendresponse", ({ success, messageStatus }) => {
      if (success) {
        setClose(false);
        message.success(`${messageStatus}`, 3);
      } else {
        message.error(`${messageStatus}`, 3);
      }
      setIsLoading(false);
    });
    return () =>
      io.off("addfriendresponse", ({ success, messageStatus }) => {
        if (success) {
          setClose(false);
          message.success(`${messageStatus}`, 3);
        } else {
          message.error(`${messageStatus}`, 3);
        }
        setIsLoading(false);
      });
  }, []);

  const submitHandler = (values) => {
    setIsLoading(true);
    io.emit("addfriend", values);
  };

  return (
    <div className="addfriend">
      <Modal visible onCancel={() => setClose(false)} footer={null}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}
            />
          </div>
        ) : (
          <Form
            name="normal_login"
            className="login-form-add"
            onFinish={submitHandler}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "Please enter a valid Email" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Friend's E-mail"
              />
            </Form.Item>
            <Form.Item
              name="message"
              rules={[{ required: true, message: "Please type a message" }]}
            >
              <Input.TextArea
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Type a message..."
                autoSize={{ minRows: 2, maxRows: 10 }}
                maxLength={150}
                showCount
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button btn"
                style={{ marginTop: "10px" }}
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Index;
