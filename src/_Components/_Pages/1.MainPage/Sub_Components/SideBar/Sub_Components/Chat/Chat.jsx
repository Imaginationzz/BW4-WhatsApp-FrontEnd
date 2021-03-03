import React from "react";

//STYLE IMPORTS
import "./Chat.scss";

export default function Chat({ user }) {
  return (
    <div className="chat" key={user._id}>
      <img src="" alt="" />
      <div className="chat-details">
        <p>{user.username}</p>
        <p>Last Msg</p>
      </div>
    </div>
  );
}

export const ChatContainer = function (props) {
  return <div className="chat">{props.children}</div>;
};
