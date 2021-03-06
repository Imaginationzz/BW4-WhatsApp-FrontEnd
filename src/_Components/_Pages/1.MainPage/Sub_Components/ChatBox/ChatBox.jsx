import React, { useState, useEffect } from "react";

import Picker from "emoji-picker-react";

//UTILITIES IMPORTS
import { getProfile } from "./utilities";

//REDUX IMPORTS
import { useSelector } from "react-redux";

//PERSONAL COMPONENTS IMPORTS
import Attachments from "./Attachments/Attachments";
import Message from "./Message/Message";

//STYLE IMPORTS

import "./ChatBox.scss";
import { setMessagesList } from "../../../../../Redux-Store/Chat/actions";

export default function ChatBox({
  functions,
  state,
  messages,
  inputMsg,
  setMessage,
  handleImage,
}) {
  const [showMedia, setShowMedia] = useState(false);
  const [chatName, setChatName] = useState("none");
  const [chosenEmoji, setChosenEmoji] = useState("");
  const [showPicker, setShowPicker] = useState("none");
  const userState = useSelector((state) => state.userState);
  const currentChat = useSelector((state) => state.chatState.current_chat);

  // console.log(messages);

  useEffect(() => {
    (async () => {
      if (currentChat) {
        // console.log(state);
        let otherUserId = currentChat.membersList.find(
          (user) => user._id !== userState.user._id
        );
        // console.log(otherUserId);
        setChatName(otherUserId.username);
      }
    })();
  }, [currentChat]);

  useEffect(() => {
    let chatBox = document.querySelector(".message-list");
    if (chatBox) {
      let scrollToBtm = (function () {
        chatBox.scrollTop = chatBox.scrollHeight;
      })();
    }
  }, [messages]);

  const showP = () => {
    if (showPicker === "none") {
      setShowPicker("flex");
    } else {
      setShowPicker("none");
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(inputMsg + emojiObject.emoji);
  };

  return (
    <div id="chatbox">
      {currentChat ? (
        <div className="chatbox-ui">
          <div className="chat-container">
            <div className="header">
              <div className="chat-info">
                <img
                  src={
                    currentChat.roomPicture
                      ? currentChat.roomPicture
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt=""
                />
                <p>{chatName}</p>
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
                    <Message
                      key={message.id}
                      sender={message.sender}
                      user={userState.user.username}
                      message={message.text}
                      media={message.media}
                      receiver={message.receiver}
                      currentChat={currentChat}
                    />
                  );
                })
              ) : (
                <p className="no-messages">No messages here.</p>
              )}
            </div>
          </div>
          <div className="input-sender">
            <i className="far fa-laugh" onClick={showP}></i>
            <Picker
              onEmojiClick={onEmojiClick}
              pickerStyle={{
                display: showPicker,
                position: "absolute",
                bottom: "9vh",
                right: "44vw",
              }}
            />
            <i
              className="fas fa-paperclip"
              onClick={() => setShowMedia(!showMedia)}
            ></i>
            <input
              type="text"
              placeholder="Type text here"
              onChange={functions}
              onKeyDown={functions}
              value={inputMsg}
            />
            <i className="fas fa-microphone"></i>
            <Attachments state={showMedia} handleImage={handleImage} />
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
