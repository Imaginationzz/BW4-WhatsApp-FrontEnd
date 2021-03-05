import React from "react";

//REDUX IMPORT
import { useSelector } from "react-redux";

//STYLE IMPORTS
import "./Message.scss";

export default function Message({
  sender,
  user,
  message,
  receiver,
  currentChat,
}) {
  // console.log(receiver);
  // console.log(currentChat);
  return (
    <div
      className="message"
      style={{
        justifyContent: sender === user ? "flex-end" : "flex-start",
        display:
          receiver[0] === currentChat._id ||
          sender === user ||
          receiver === currentChat._id
            ? ""
            : "none",
      }}
    >
      <div
        className="message-container"
        style={
          sender === user
            ? {
                backgroundColor: "blue",
                transformOrigin: "100% 0%",
              }
            : {
                backgroundColor: "green",
                transformOrigin: "0% 0%",
              }
        }
      >
        <header
          style={
            sender === user
              ? {
                  color: "blue",
                  right: "0",
                }
              : {
                  left: "0",
                  color: "green",
                }
          }
        >
          {sender}
        </header>
        <p>{message}</p>
      </div>
    </div>
  );
}
