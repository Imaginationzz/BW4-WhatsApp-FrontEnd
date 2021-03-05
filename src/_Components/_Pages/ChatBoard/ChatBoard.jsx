import React, { useState, useEffect } from "react";
import io from "socket.io-client";


//UTILITIES IMPORTS
import { getAllMembers, sendMessage } from "./utilities";

//REDUX IMPORTS
import { useSelector } from "react-redux";

//BOOTSTRAP IMPORTS
import { Row, Col } from "react-bootstrap";

//STYLE IMPORTS
import "./ChatBoard.css";

function ChatBoard() {
  //STATES
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const state = useSelector((state) => state);

  //SOCKET CONNECTION
  let userId = state.userState.user._id;
  const connOpt = {
    transports: ["websocket", "polling"],
    query: { userId: userId },
  };

  let socket = io("http://localhost:5000", connOpt);

  //ONMOUNT
  useEffect(() => {
    (async () => {
      const allMembers = await getAllMembers(
        state.tokenState.access_token.access_token
      );
      setConnectedUsers(allMembers);
    })();

    socket.emit("joinRoom", {
      username: state.userState.user.username,
      roomName: "roomTest2",
    });

    socket.on("joinRoom", () => console.log("joined"));

    socket.on("message", (msg) =>
      setMessages((messages) => messages.concat(msg))
    );

    socket.on("connect", () => console.log("connected to socket"));
  }, []);

  const handleMessage = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      sendMessage(socket, message, "roomTest2");
      setMessage("");
    } else {
      setMessage(e.currentTarget.value);
    }
  };

  return (
    <div className="mainPage">
      <Row>
        <Col xs={4}>
          <div className="header">
            <img src="" alt="" />
            <div className="header-controllers">
              <i className="fas fa-sync"></i>
              <i className="far fa-comment"></i>
              <i className="fas fa-ellipsis-v"></i>
            </div>
          </div>
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search" />
          </div>
          <div className="users-list">
            {connectedUsers.map((user) => {
              return (
                <div className="user" key={user.id}>
                  <img src="" alt="" />
                  <div
                    className="chat-details"
                    // onClick={() => joinRoom(user.socketId)}
                  >
                    <p>{user.username}</p>
                    <p>most recent message</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
        <Col xs={8}>
          <div className="chat-box">
            {messages.map((msg) => {
              return (
                <div className="msg">
                  <p className="sender">{msg.sender}</p>
                  <p className="text">{msg.text}</p>
                </div>
              );
            })}
          </div>
          <div className="send-message">
            <input
              type="text"
              onChange={handleMessage}
              onKeyDown={handleMessage}
              value={message}
            />
            <button onClick={() => sendMessage(socket, message, "roomTest2")}>
              Send
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ChatBoard;
