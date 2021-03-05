import React from "react";

//STYLE IMPORTS
import "./ChatOptions.scss";

export default function ChatOptions({ functions, show }) {
  return (
    <div
      className="chat-options"
      style={{ transform: show.state === show.i ? "" : "scale(0)" }}
    >
      <ul>
        <li>Archive chat</li>
        <li>Mute notifications</li>
        <li onClick={() => functions()}>Delete chat</li>
        <li>Unpin chat</li>
        <li>Mark as unread</li>
      </ul>
    </div>
  );
}
