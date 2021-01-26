import React from "react";
import { Drawer, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import Container from "../../friendRequestBox/index";

const Index = ({
  setNotificationDrawer,
  notificationDrawer,
  friendRequests,
  mWeb
}) => {

  const notificationHeader = (
    <div style={{ display: "flex", alignContent: "center" }}>
      <Button
        onClick={() => setNotificationDrawer(false)}
        type="text"
        icon={<LeftOutlined />}
      />
      <span style={{ alignSelf: "center", margin: "0 auto" }}>
        Notifications
      </span>
    </div>
  );

  return (
    <Drawer
      title={notificationHeader}
      placement="right"
      closable={false}
      onClose={() => setNotificationDrawer(false)}
      visible={notificationDrawer}
      placement={"left"}
      width={mWeb ? "100%" : "30%"}
    >
      {friendRequests?.data?.unmappedFriends?.map((item) => (
        <Container userData={item} />
      ))}
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  friendRequests: state.dashBoard.getUserFriends.data,
});

export default connect(mapStateToProps, null)(Index);
