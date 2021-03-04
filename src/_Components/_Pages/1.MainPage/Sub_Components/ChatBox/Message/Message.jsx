import React from "react";

//STYLE IMPORTS
import "./Message.scss";

export default function Message({ sender, user, message }) {
  return (
    <div
      className="message"
      style={{ justifyContent: sender === user ? "flex-end" : "flex-start" }}
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
