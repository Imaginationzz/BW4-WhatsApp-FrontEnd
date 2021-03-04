import React, { useEffect, useState } from "react";

//SOCKET IMPORTS
import io from "socket.io-client";

//UTILITIES IMPORTS
import { getRooms } from "./utilities";
import { socketConnection } from "../../utilities";

//PERSONAL COMPONENTS IMPORTS
import OptionsDropDown from "./Sub_Components/OptionsDropDown/OptionsDropDown";
import NoResult from "./Sub_Components/NoResult/NoResult";
import { Link } from "react-router-dom";

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentChat,
  setMessagesList,
  setChatList,
} from "../../../../../Redux-Store/Chat/actions";

//STYLE IMPORTS
import "./SideBar.scss";
import ProfileEdit from "./Sub_Components/3.Profile/Profile";

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

export default function SideBar({ socket, functions, state }) {
  const [counter, setCounter] = useState(0);
  const [chatList, setChatList] = useState([]);
  const [options, setOptions] = useState(false);

  const userState = useSelector((state) => state.userState);
  const tokenState = useSelector((state) => state.tokenState);
  const chatState = useSelector((state) => state.chatState);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let rooms = await getRooms(userId);
      // console.log(rooms);
      let reversed = rooms.reverse();
      setChatList(reversed);
      // dispatch(setChatList(rooms));
    })();
  }, [state]);

  return (
    <div id="sidebar">
      <div className="header">
        <img src={userState.user.picture} alt="" onClick={()=>functions("profile")} />
        <div className="header-controllers">
          <i className="fas fa-sync"></i>
          <i
            className="far fa-comment"
            onClick={() => functions("contact-list")}
          ></i>
          <i className="fas fa-ellipsis-v" onClick={() => setOptions(!options)}>
            <OptionsDropDown state={options} functions={functions} />
          </i>
        </div>
      </div>
      <div className="searchbar">
        <div className="search-container">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="chat-list">
        {chatList && chatList.length > 0 ? (
          chatList.map((chat) => {
            return (
              <div className="chat" key={chat._id} onClick={() => socket(chat)}>
                <img
                  src={
                    chat.roomPicture
                      ? chat.roomPicture
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt=""
                />
                <div className="chat-details">
                  <p>{chat.roomName}</p>
                  <p>Last Msg</p>
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
