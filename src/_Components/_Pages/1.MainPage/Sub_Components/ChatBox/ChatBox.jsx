import React, { useState, useEffect } from "react";

//REDUX IMPORTS
import { useSelector } from "react-redux";

//PERSONAL COMPONENTS IMPORTS
import Attachments from "./Attachments/Attachments";

//STYLE IMPORTS
import "./ChatBox.scss";

export default function ChatBox({ functions, state, messages }) {
  const [showMedia, setShowMedia] = useState(false);
  const chatState = useSelector((state) => state.chatState);

  useEffect(() => {}, [state]);

  return (
    <div id="chatbox">
      {state ? (
        <div className="chatbox-ui">
          <div className="chat-container">
            <div className="header">
              <div className="chat-info">
                <img src="" alt="" />
                <p>
                  {state !== null && state.roomName ? state.roomName : "none"}
                </p>
              </div>
              <div className="chat-controllers">
                <i className="fas fa-search"></i>
                <i className="fas fa-ellipsis-h"></i>
              </div>
            </div>
            <div className="message-list">
              {messages && messages.length > 0 ? (
                messages.map((message) => {
                  return (
                    <div className="message" key={message.id}>
                      {message.sender}
                      {message.text}
                    </div>
                  );
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
            <input
              type="text"
              placeholder="Type text here"
              onChange={functions}
              onKeyDown={functions}
            />
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
