import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import "./index.css";
import moment from "moment";
import { DownCircleFilled } from "@ant-design/icons";
import ChatBubble from "../chatBubble/index";
import { connect } from "react-redux";
import { Input, Button } from "antd";
import Skelton from "../Skeltons/chatRoom";
import SocketContext from "../../contexts/SocketContext";

const MessageInput = ({ roomData, curUserEmail, isLoading }) => {
  const io = useContext(SocketContext);
  const [message, setMessage] = useState([]);
  const [showDown, setShowDown] = useState(false);
  const [text, setText] = useState("");
  const scrollBottomRef = useRef();
  const scrollBoxRef = useRef();

  const scrollToLast = useCallback((node) => {
    //
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  useEffect(() => {
    io.on("revieveMessage", (message) => {
      setMessage((prevState) => [...prevState, message]);
    });
    return () => io.off("revieveMessage", (message) => {
      setMessage((prevState) => [...prevState, message]);
    });
  }, []);

  useEffect(() => {
    const event = () => {
      const heightScrollBox = scrollBoxRef.current.offsetHeight;
      const containerHeight = scrollBottomRef.current.offsetHeight;
      if (
        scrollBottomRef.current.scrollTop <
        heightScrollBox - 2 * containerHeight
      ) {
        setShowDown(true);
      } else {
        setShowDown(false);
      }
    };
    if (scrollBottomRef.current) {
      scrollBottomRef.current.addEventListener("scroll", event, {
        passive: true,
      });
    }
    return () => {
      if (scrollBottomRef.current) {
        scrollBottomRef.current.removeEventListener("scroll", event, {
          passive: true,
        });
      }
    };
  }, [typeof scrollBottomRef.current !== "undefined"]);

  useEffect(() => {
    setMessage(roomData?.data?.messages);
  }, [roomData]);

  const handleSubmit = () => {
    if (text.trim() === "") {
      setText("");
      return;
    }
    setMessage((prevState) => [
      ...prevState,
      { text, createdAt: moment().valueOf(), email: curUserEmail },
    ]);
    const message = {
      text,
      createdAt: moment().valueOf(),
      email: curUserEmail,
    };
    io.emit("sendMessage", { roomId: roomData?.data?.roomId, message });
    setText("");
  };

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  const moveDown = () => {
    const node = scrollBottomRef.current;
    scrollBottomRef.current.scrollTop = node.scrollHeight;
  };

  return (
    <>
      {isLoading ? (
        <div style={{ padding: "10px", flex: 1 }}>
          <Skelton />
        </div>
      ) : (
        <>
          <div ref={scrollBottomRef} className="messageBox">
            <div ref={scrollBoxRef} className="messageBoxInner">
              <ChatBubble
                me={curUserEmail}
                scrollToLast={scrollToLast}
                message={message}
              />
            </div>
          </div>
          {showDown && (
            <span className="moveDown">
              <DownCircleFilled onClick={moveDown} style={{ fontSize: 30 }} />
            </span>
          )}
          <div className="containerForm">
            <Input
              value={text}
              placeholder="Type a message"
              type="textarea"
              onKeyUp={(event) => handleEnter(event)}
              onChange={(event) => setText(event.target.value)}
            />
            <Button onClick={handleSubmit} className="btn" type="primary">
              Send
            </Button>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  roomData: state.dashBoard.roomChatData.data,
  isLoading: state.setSkeltonLoader.isLoading,
});

export default connect(mapStateToProps, null)(React.memo(MessageInput));
