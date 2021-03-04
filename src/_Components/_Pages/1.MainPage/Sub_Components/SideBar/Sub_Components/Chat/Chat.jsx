import React from "react";

//STYLE IMPORTS
import "./Chat.scss";

export default function Chat({ user, functions, lastMessage }) {
  return (
    <div className="chat" key={user._id} onClick={functions}>
      <img src={user.picture ? user.picture : ""} alt="" />
      <div className="chat-details">
        <p>{user.username}</p>
        <p>{lastMessage ? lastMessage : user.bio}</p>
      </div>
    </div>
  );
}

export const ChatContainer = function (props) {
  return <div className="chat">{props.children}</div>;
};
