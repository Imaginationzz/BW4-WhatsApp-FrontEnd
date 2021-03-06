import React, { useEffect, useState } from "react";

//UTILITIES IMPORTS
import { getRooms } from "./utilities";

//PERSONAL COMPONENTS IMPORTS
import OptionsDropDown from "./Sub_Components/OptionsDropDown/OptionsDropDown";
import NoResult from "./Sub_Components/NoResult/NoResult";
import ProfileEdit from "./Sub_Components/3.Profile/Profile";
import { Link } from "react-router-dom";

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import {
  setChat,
  setChatList,
  setDeletedChat,
  removeDeletedChat,
} from "../../../../../Redux-Store/Chat/actions";
import { setSide } from "../../../../../Redux-Store/SideBar/actions";

//REACT BOOTSTRAP IMPORTS
import { Badge } from "react-bootstrap";

//STYLE IMPORTS
import "./SideBar.scss";
import ChatOptions from "./Sub_Components/ChatOptions/ChatOptions";

export default function SideBar({ functions, messages }) {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");

  //STATE
  const [options, setOptions] = useState(false);
  const [chatOptions, setChatOptions] = useState(null);
  const [not, setNot] = useState([]);

  const userState = useSelector((state) => state.userState);
  const chatList = useSelector((state) => state.chatState.chatList);
  const sideState = useSelector((state) => state.sideBar);
  const deletedChats = useSelector((state) => state.chatState.deletedChat);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let rooms = await getRooms(userId);
      let reversed = rooms.reverse();
      dispatch(setChatList(reversed));
    })();
  }, [sideState]);

  useEffect(() => {
    (async () => {
      let rooms = await getRooms(userId);
      let reversed = rooms.reverse();
      dispatch(setChatList(reversed));
      let lastMsg = messages[messages.length - 1];
      deletedChats.forEach((chat) => {
        if (lastMsg && chat === lastMsg.receiver) {
          dispatch(removeDeletedChat(chat));
        }
      });
      chatList.forEach((chat) => {
        if (lastMsg && chat._id === lastMsg.receiver) {
          setNot(not.concat(chat._id));
        }
      });
    })();
  }, [messages]);

  const searchChat = async (e) => {
    if (e.currentTarget.value !== "") {
      setChatList(
        chatList.filter((chat) => chat.roomName.includes(e.currentTarget.value))
      );
    } else {
      let rooms = await getRooms(userId);
      let reversed = rooms.reverse();
      setChatList(reversed);
    }
  };

  const leaveRoom = async (roomId) => {
    await functions.leaveRoom(roomId);
    let rooms = await getRooms(userId);
    let reversed = rooms.reverse();
    dispatch(setChatList(reversed));
  };

  const deleteChat = async (roomId) => {
    dispatch(setDeletedChat(roomId));
    // dispatch(setChat(null));
  };

  const onChatClick = (chat) => {
    dispatch(setChat(chat));
    setNot(not.filter((notification) => notification !== chat._id));
  };

  return (
    <div id="sidebar">
      <div className="header">
        <img
          src={userState.user.picture}
          alt=""
          onClick={() => dispatch(setSide("profile"))}
        />
        <div className="header-controllers">
          <i className="fas fa-sync"></i>
          <i
            className="far fa-comment"
            onClick={() => dispatch(setSide("contact-list"))}
          ></i>
          <i className="fas fa-ellipsis-v" onClick={() => setOptions(!options)}>
            <OptionsDropDown state={options} />
          </i>
        </div>
      </div>
      <div className="searchbar">
        <div className="search-container">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search..." onChange={searchChat} />
        </div>
      </div>
      <div className="chat-list">
        {chatList && chatList.length > 0 ? (
          chatList.map((chat, i) => {
            return (
              <div
                className="chat"
                key={chat._id}
                onClick={() => onChatClick(chat)}
                style={{
                  display: deletedChats.includes(chat._id) ? "none" : "",
                }}
              >
                <Badge
                  variant="danger"
                  style={{ display: not.includes(chat._id) ? "" : "none" }}
                >
                  !
                </Badge>
                <ChatOptions
                  functions={() => deleteChat(chat._id)}
                  show={{ i: i, state: chatOptions }}
                />
                <img
                  src={
                    chat.roomPicture
                      ? chat.roomPicture
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt=""
                />
                <div className="chat-details">
                  <i
                    className="fas fa-caret-down"
                    onClick={() => {
                      chatOptions === i
                        ? setChatOptions(null)
                        : setChatOptions(i);
                    }}
                  ></i>
                  <p>
                    {chat.roomName === userState.user.username
                      ? chat.membersList.filter(
                          (member) =>
                            member.username !== userState.user.username
                        )[0].username
                      : chat.roomName}
                  </p>
                  <p>
                    {chat.messages.length > 0 && chat.messages !== undefined
                      ? chat.messages[chat.messages.length - 1].text
                      : "No messages"}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <NoResult
            title="No Chats are here click on message icon to start a conversation or create a chat group."
            icon="far fa-comments"
          />
        )}
      </div>
    </div>
  );
}
