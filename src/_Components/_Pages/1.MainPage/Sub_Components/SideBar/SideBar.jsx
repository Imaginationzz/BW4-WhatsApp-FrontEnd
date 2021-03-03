import React, { useEffect, useState } from "react";

//SOCKET IMPORTS
import io from "socket.io-client";

//UTILITIES IMPORTS
import { createConversation } from "./utilities";
import { socketConnection } from "../../utilities";

//PERSONAL COMPONENTS IMPORTS
import OptionsDropDown from "./Sub_Components/OptionsDropDown/OptionsDropDown";

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentChat,
  setMessagesList,
} from "../../../../../Redux-Store/Chat/actions";

//STYLE IMPORTS
import "./SideBar.scss";
let socket;
export default function SideBar({ functions }) {
  const [membersList, setMembersList] = useState([]);
  const [options, setOptions] = useState(false);

  const userState = useSelector((state) => state.userState);
  const tokenState = useSelector((state) => state.tokenState);
  const chatState = useSelector((state) => state.chatState);
  const dispatch = useDispatch();
  let userId = userState.user._id;
  socket = socketConnection(userId, io);

  const createConvo = async (user) => {
    let usersId = [{ memberId: userState.user._id }, { memberId: user._id }];
    const newRoom = await createConversation(
      user.username,
      usersId,
      tokenState.access_token
    );
    dispatch(setCurrentChat(newRoom));
    // console.log(newRoom);
    socket.emit("joinRoom", { username: user.username, roomId: newRoom._id });
    socket.on("membersList", (membersList) => console.log(membersList.list));
    socket.on("message", (msg) =>
      dispatch(setMessagesList((messagesList) => messagesList.concat(msg)))
    );
    console.log("joined", membersList);
  };

  return (
    <div id="sidebar">
      <div className="header">
        <img src="" alt="" />
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
        {chatState.chatList && chatState.chatList.length > 0 ? (
          chatState.chatList.map((chat) => {
            return (
              <div className="chat" key={chat._id}>
                <img src="" alt="" />
                <div className="chat-details">
                  <p>chat name</p>
                  <p>Last Msg</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-result">
            No Chats are here click on message icon to start a conversation or
            create a chat group.
          </p>
        )}
      </div>
    </div>
  );
}
