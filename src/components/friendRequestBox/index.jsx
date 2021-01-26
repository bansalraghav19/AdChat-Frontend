import React, { useContext } from "react";
import { Button, Avatar } from "antd";
import SocketContext from "../../contexts/SocketContext";
import "./index.css";

const Index = ({ userData }) => {
  const io = useContext(SocketContext);
  const declineHandle = (email) => {
    io.emit("declined", { email });
  };
  const acceptHandle = (email) => {
    io.emit("accepted", { email });
  };
  return (
    <div className="card-container">
      <div className="userInfo">
        <div style={{ marginRight: '10px'}}>
          <Avatar size={100} src={userData?.user_image || "./dummy.png"} />
        </div>
        <div className="userdetails">
          <div className="username">{userData?.name}</div>
          <div className="message">
            <blockquote>{`"${userData?.message}"`}</blockquote>
          </div>
        </div>
      </div>
      <div className="groupbtns">
        <Button onClick={() => declineHandle(userData?.email)}>Decline</Button>
        <Button
          type="primary"
          className="btn"
          onClick={() => acceptHandle(userData?.email)}
        >
          Accept
        </Button>
      </div>
    </div>
  );
};

export default Index;
