import React, { useState, useEffect } from "react";
import "./index.css";
import { connect } from "react-redux";
import { Avatar, Button, Dropdown, Menu } from "antd";
import { logoutUser } from "../../screens/authorization/action";
import Skeleton from "../Skeltons/myheaderSkelton";
import {
  PlusOutlined,
  MoreOutlined,
  NotificationOutlined,
  LogoutOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import RequestModal from "../modals/friendRequest/index";
import NotificationsDrawer from "../drawers/notifications/index";
import EditProfileDrawer from "../drawers/editProfile/index";
import ChangePasswordDrawer from "../drawers/changePassword/index";
import { isLogged } from "../../lib/helpers/actionHandlers";

const Header = ({ logoutUser, imageUrl, showCount, mWeb }) => {
  const [notificationDrawer, setNotificationDrawer] = useState(false);
  const [editProfileDrawer, setEditProfileDrawer] = useState(false);
  const [changePasswordDrawer, setChangePasswordDrawer] = useState(false);
  const [close, setClose] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const menuHandler = async (event) => {
    if (event.key === "3") {
      await logoutUser();
      localStorage.removeItem("id_token");
    } else if (event.key === "1") {
      setEditProfileDrawer(true);
    } else if (event.key === "2") {
      setChangePasswordDrawer(true);
    }
  };

  const menu = (
    <Menu onClick={(event) => menuHandler(event)}>
      <Menu.Item style={{ fontSize: "16px" }} key="1">
        <EditOutlined /> My Profile
      </Menu.Item>
      <Menu.Item style={{ fontSize: "16px" }} key="2">
        <EyeInvisibleOutlined />
        Change Password
      </Menu.Item>
      <Menu.Item style={{ fontSize: "16px" }} key="3">
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <NotificationsDrawer
        setNotificationDrawer={setNotificationDrawer}
        notificationDrawer={notificationDrawer}
        mWeb={mWeb}
      />
      <EditProfileDrawer
        setEditProfileDrawer={setEditProfileDrawer}
        editProfileDrawer={editProfileDrawer}
        mWeb={mWeb}
      />
      <ChangePasswordDrawer
        setChangePasswordDrawer={setChangePasswordDrawer}
        changePasswordDrawer={changePasswordDrawer}
        mWeb={mWeb}
      />
      {close && <RequestModal setClose={setClose} />}
      {isLoading && (
        <div className="skeltonMyHeader">
          <Skeleton />
        </div>
      )}
      <div
        style={{ visibility: isLoading ? "hidden" : "visible" }}
        className="containerMyBox"
      >
        <div className="col1">
          <img
            src={imageUrl}
            className="imgHeader"
            onLoad={() => setIsLoading(false)}
          />
        </div>
        <div className="editButtons">
          <Button
            shape="circle"
            type="primary"
            icon={<NotificationOutlined />}
            size={20}
            onClick={() => setNotificationDrawer(true)}
            style={{
              margin: "0 10px",
              cursor: "pointer",
              position: "relative",
            }}
          >
            {typeof showCount !== "undefined" && showCount > 0 && (
              <div className="badge">{showCount}</div>
            )}
          </Button>
          <Button
            shape="circle"
            type="primary"
            icon={<PlusOutlined />}
            size={20}
            onClick={() => setClose(true)}
            style={{ margin: "0 10px", cursor: "pointer" }}
          />
          <Dropdown overlay={menu} placement="bottomRight">
            <Button
              shape="circle"
              type="primary"
              icon={<MoreOutlined />}
              size={20}
              className="ant-dropdown-link"
              style={{ marginLeft: "10px", cursor: "pointer" }}
            />
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default React.memo(connect(null, { logoutUser })(Header));
