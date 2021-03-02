import React, { useState } from "react";

//PERSONAL COMPONENTS IMPORTS
import Attachments from "./Attachments/Attachments";

//STYLE IMPORTS
import "./ChatBox.scss";

export default function ChatBox({ chat, messageList }) {
  const [showMedia, setShowMedia] = useState(false);

  return (
    <div id="chatbox">
      {!chat ? (
        <div className="chatbox-ui">
          <div className="chat">
            <div className="header">
              <div className="chat-info">
                <img src="" alt="" />
                <p>Name</p>
              </div>
              <div className="chat-controllers">
                <i className="fas fa-search"></i>
                <i className="fas fa-ellipsis-h"></i>
              </div>
            </div>
            <div className="message-list">
              {messageList && messageList.length > 0 ? (
                messageList.map((message) => {
                  return <div className="message" key={message.id}></div>;
                })
              ) : (
                <p className="no-messages">No messages here.</p>
              )}
            </div>
          </div>
          <div className="input-sender">
            <i className="far fa-laugh"></i>
            <i
              className="fas fa-paperclip"
              onClick={() => setShowMedia(!showMedia)}
            ></i>
            <input type="text" placeholder="Type text here" />
            <i className="fas fa-microphone"></i>
            <Attachments state={showMedia} />
          </div>
        </div>
      ) : (
        <div className="no-chat">
          <i className="fas fa-wifi"></i>
          <h3>Keep your phone connected</h3>
          <p>
            WhatsApp connects to your phone to sync messages. To reduce data
            usage, connect your phone to Wi-Fi.
          </p>
        </div>
      )}
    </div>
  );
}
