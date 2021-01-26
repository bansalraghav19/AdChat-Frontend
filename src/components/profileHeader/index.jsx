import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Skeleton from "../Skeltons/ProfileHeader";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import FreindProfile from "../drawers/editProfile/freindDrawer";
import "./index.css";

const ProfileHeader = ({ userInfo, setCurChat, mWeb }) => {
  const [editProfileDrawer, setEditProfileDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userInfo?.isLoading) {
      setIsLoading(true);
    }
  }, [userInfo]);

  return (
    <>
      <FreindProfile
        setEditProfileDrawer={setEditProfileDrawer}
        editProfileDrawer={editProfileDrawer}
        getUserData={userInfo?.data}
        mWeb={mWeb}
      />
      <div className="headerContainerBox">
        {isLoading && (
          <div className="containerBox skeltonProfile">
            <Skeleton />
          </div>
        )}
        {mWeb && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: '0 10px'
            }}
          >
            <Button
              onClick={() => setCurChat(-1)}
              type="text"
              icon={<LeftOutlined />}
            />
          </div>
        )}
        <div
          style={{ visibility: isLoading ? "hidden" : "visible" }}
          onClick={() => setEditProfileDrawer(true)}
          className="containerBox"
        >
          <div>
            <img
              className="imgHead"
              size={55}
              src={userInfo?.data?.data?.user_image}
              onLoad={() => setIsLoading(false)}
            />
          </div>
          <div className="userDetails">
            <div>
              <span>{userInfo?.data?.data?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.dashBoard.getFriendData,
});

export default connect(mapStateToProps, null)(React.memo(ProfileHeader));
