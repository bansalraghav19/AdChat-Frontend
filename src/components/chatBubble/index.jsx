import React from "react";
import moment from "moment";
import "./index.css";

const Index = ({ message, scrollToLast, me }) => {
  return message?.map((item, index) => (
    <div
      ref={message?.length === index + 1 ? scrollToLast : null}
      className={item.email !== me ? "bubble" : "sender"}
    >
      <span className="messageText">
        {item.text}
      </span>
      <span className="messageTime">
        {moment(item.createdAt).format("hh:mm a")}
      </span>
    </div>
  ));
};

export default React.memo(Index);
