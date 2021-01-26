import React from "react";
import "./index.css";
import { connect } from "react-redux";
import { getFriendData, roomChatData } from "../../screens/dashboard/action";

const userCard = ({
  isActive,
  curRoomId,
  setCurChat,
  userData,
  getFriendData,
  roomChatData,
  setImageCounter,
  mWeb,
}) => {
  const clickHandler = async (roomId, userId) => {
    if (roomId === curRoomId) {
      setCurChat(roomId);
    } else {
      setCurChat(roomId);
      await Promise.all([getFriendData(userId), roomChatData(roomId)]);
    }
  };

  return (
    <div
      onClick={() => clickHandler(userData?.roomId, userData?.userId)}
      className={"containerCard" + (isActive && !mWeb ? " activecard" : "")}
    >
      {/* // image  */}
      <div className="card1">
        <img
          size={55}
          className="imgUserCard"
          onLoad={() => setImageCounter((prevState) => prevState + 1)}
          src={userData?.user_image}
        />
      </div>
      <div className="card2">
        <div className="detailsUp">
          <span>{userData?.name}</span>
          {/* <span>8:43 PM</span> */}
        </div>
        <div className="message">{/* <span>Hello Brother!</span> */}</div>
      </div>
    </div>
  );
};

export default connect(null, { getFriendData, roomChatData })(
  React.memo(userCard)
);
