import React, { useEffect, useState } from "react";

//SOCKET IMPORTS
import io from "socket.io-client";

//UTILITIES IMPORTS
import { createConversation, getRooms } from "./utilities";
import { socketConnection } from "../../utilities";

//PERSONAL COMPONENTS IMPORTS
import OptionsDropDown from "./Sub_Components/OptionsDropDown/OptionsDropDown";
import NoResult from "./Sub_Components/NoResult/NoResult";
import {Link} from "react-router-dom"


//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentChat,
  setMessagesList,
  setChatList,
} from "../../../../../Redux-Store/Chat/actions";

//STYLE IMPORTS
import "./SideBar.scss";

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

export default function SideBar({ socket, functions }) {
  const [counter, setCounter] = useState(0);
  const [chatList, setChatList] = useState([]);
  const [options, setOptions] = useState(false);

  const userState = useSelector((state) => state.userState);
  const tokenState = useSelector((state) => state.tokenState);
  const chatState = useSelector((state) => state.chatState);
  const dispatch = useDispatch();

  // const createConvo = async (user) => {
  //   let usersId = [{ memberId: userState.user._id }, { memberId: user._id }];
  //   const newRoom = await createConversation(
  //     user.username,
  //     usersId,
  //     tokenState.access_token
  //   );
  //   dispatch(setCurrentChat(newRoom));
  //   // console.log(newRoom);
  //   socket.emit("joinRoom", { username: user.username, roomId: newRoom._id });
  //   socket.on("membersList", (membersList) => console.log(membersList.list));
  //   socket.on("message", (msg) =>
  //     dispatch(setMessagesList((messagesList) => messagesList.concat(msg)))
  //   );
  //   console.log("joined", membersList);
  // };
  useEffect(() => {
    (async () => {
      let rooms = await getRooms(userId);
      setChatList(rooms);
      // dispatch(setChatList(rooms));
    })();
    setCounter(counter + 1);
  }, []);
  console.log("joined");
  return (
    <div id="sidebar">
      <div className="header">
        <Link to="/ProfileEdit">
        <img src={userState.user.picture} alt="" />
        </Link>
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
                <img src="" alt="" />
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
