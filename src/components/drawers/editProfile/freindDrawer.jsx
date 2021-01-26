import React, { useState, useEffect } from "react";
import { Drawer, Button, Image, Switch, Upload, Skeleton } from "antd";
import "./index.css";
import { LeftOutlined } from "@ant-design/icons";

const Index = ({ setEditProfileDrawer, editProfileDrawer, getUserData, mWeb }) => {
  const [skelton, setSkelton] = useState(true);

  const notificationHeader = (
    <div style={{ display: "flex", alignContent: "center" }}>
      <Button
        onClick={() => setEditProfileDrawer(false)}
        type="text"
        icon={<LeftOutlined />}
      />
      <span style={{ alignSelf: "center", margin: "0 auto" }}>
        {getUserData?.data?.name} Profile
      </span>
    </div>
  );

  return (
    <Drawer
      title={notificationHeader}
      placement="right"
      closable={false}
      onClose={() => setEditProfileDrawer(false)}
      visible={editProfileDrawer}
      placement={"left"}
      width={mWeb ? "100%" : "30%"}
    >
      {skelton && <Skeleton avatar paragraph={{ rows: 15 }} />}
      <div
        style={{
          opacity: skelton ? 0 : 1,
        }}
        className="profileDrawer"
      >
        <div className="userdetails">
          <Image
            width={200}
            src={getUserData?.data?.user_image}
            onLoadCapture={() => setSkelton(false)}
          />
          <span>
            <span style={{ color: "red" }}>@</span>
            {getUserData?.data?.email}
          </span>
        </div>
        <div className="editable">
          <span className="username">{getUserData?.data?.name}</span>
          <blockquote>
            {getUserData?.data?.about?.length
              ? `"${getUserData?.data?.about}"`
              : ""}
          </blockquote>
        </div>
      </div>
    </Drawer>
  );
};

export default React.memo(Index);
