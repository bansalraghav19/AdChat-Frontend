import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./index.css";
import { connect } from "react-redux";
import { notification, message, Spin, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import socket from "socket.io-client";
import Card from "../../components/userCard/index";
import UserHeader from "../../components/profileHeader/index";
import MyProfileHeader from "../../components/myProfileHeader/index";
import MessageInput from "../../components/messageInput/index";
import SocketContext from "../../contexts/SocketContext";
import { getUserFriends } from "./action";
import Skelton from "../../components/Skeltons/userCard";

const io = socket.connect(`https://advchatapp.herokuapp.com`);

const openNotification = (message) => {
  notification.info({
    message: `${message}`,
    placement: "bottomRight",
  });
};

const DashBoard = ({ getUserData, isLoading, getUserFriends, friendsData }) => {
  const [curChat, setCurChat] = useState(-1);
  const [skeltonLoading, setSkeltonLoading] = useState(true);
  const [imageCounter, setImageCounter] = useState(0);
  const [mWeb, setmWeb] = useState(false);

  useEffect(() => {
    const event = () => {
      setmWeb(window.innerWidth <= 767);
    };
    window.addEventListener("resize", event);
    setmWeb(window.innerWidth <= 767);
    return () => window.removeEventListener("resize", event);
  }, [typeof window !== "undefined"]);

  const music = new Audio("./message_tone.mp3");

  useEffect(() => {
    message.success(`Welcome Back, ${getUserData?.data?.data?.name}`, 3);
    io.on("refershFriends", async () => {
      await getUserFriends();
    });
    return () =>
      io.off("refershFriends", async () => {
        await getUserFriends();
      });
  }, []);

  useEffect(() => {
    if (imageCounter === friendsData?.data?.friendsList?.length) {
      setSkeltonLoading(false);
    }
  }, [imageCounter]);

  useEffect(() => {
    io.on("notification", async ({ message }) => {
      music.play();
      openNotification(message);
    });
    return () =>
      io.off("notification", async ({ message }) => {
        music.play(message);
        openNotification(message);
      });
  }, []);

  useEffect(() => {
    const getFriends = async () => {
      await getUserFriends();
    };
    if (getUserData?.data?.data?.email) {
      if (!friendsData?.data?.friendsList) {
        getFriends();
      }
      const { email, _id, name } = getUserData?.data?.data;
      io.emit("join", { email, _id, name });
    }
  }, [getUserData]);

  return isLoading ? (
    <div className="centerBox">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} size />} />
    </div>
  ) : (
    <SocketContext.Provider value={io}>
      <div className="row">
        <div
          className={
            !mWeb
              ? "col col1"
              : curChat === -1
              ? "col col1 other"
              : "col col1 mWeb"
          }
        >
          <div className="sticky">
            <MyProfileHeader
              mWeb={mWeb}
              showCount={friendsData?.data?.unmappedFriends?.length}
              imageUrl={getUserData?.data?.data?.user_image}
            />
          </div>
          {skeltonLoading && (
            <div>
              <Skelton />
            </div>
          )}
          <div style={{ visibility: skeltonLoading ? "hidden" : "visible" }}>
            {friendsData?.data?.friendsList?.map((item, index) => (
              <Card
                setCurChat={setCurChat}
                isActive={curChat === item.roomId}
                userData={item}
                mWeb={mWeb}
                curRoomId={curChat}
                setImageCounter={setImageCounter}
              />
            ))}
          </div>
        </div>
        <div
          className={
            !mWeb
              ? "col col2"
              : curChat === -1
              ? "col col2 mWeb"
              : "col col2 other"
          }
        >
          {curChat === -1 ? (
            <Empty style={{ margin: "auto 0" }} description={false} />
          ) : (
            <>
              <UserHeader mWeb={mWeb} setCurChat={setCurChat} />
              <MessageInput curUserEmail={getUserData?.data?.data?.email} />
            </>
          )}
        </div>
      </div>
    </SocketContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  getUserData: state.getUserDetails,
  isLoading: state.setLoader.isLoading,
  friendsData: state.dashBoard.getUserFriends.data,
});

export default React.memo(
  connect(mapStateToProps, { getUserFriends })(DashBoard)
);
