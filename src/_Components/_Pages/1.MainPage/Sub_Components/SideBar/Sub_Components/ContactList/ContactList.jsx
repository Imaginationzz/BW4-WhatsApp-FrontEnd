import React, { useState, useEffect } from "react";

//PERSONAL COMPONENTS IMPORTS
import { ChatContainer } from "../Chat/Chat";
import Chat from "../Chat/Chat";
import Headers from "../Headers/Headers";
import NoResult from "../NoResult/NoResult";

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import { setSide } from "../../../../../../../Redux-Store/SideBar/actions";

//STYLE IMPORTS
import "./ContactList.scss";

export default function ContactList({ socket }) {
  //STATE
  const [list, setList] = useState([]);
  //REDUX STATE
  const userState = useSelector((state) => state.userState);
  const sideState = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();
  //
  const userList = userState.userList;
  let filtered = userList.filter((user) => user._id !== userState.user._id);

  // console.log(userList);

  useEffect(() => {
    setList(filtered);
  }, [sideState]);

  //FILTER USERS
  const searchUser = (e) => {
    if (e.currentTarget.value !== "") {
      setList(
        list.filter((user) => user.username.includes(e.currentTarget.value))
      );
    } else {
      setList(filtered);
    }
  };

  return (
    <div
      className="contact-list"
      style={{ marginLeft: sideState === "contact-list" ? "" : "-100%" }}
    >
      <Headers
        title="New chat"
        functions={() => dispatch(setSide("sidebar"))}
      />
      <div className="searchbar">
        <div className="search-container">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search contacts"
            onChange={searchUser}
          />
        </div>
      </div>
      <div className="contacts">
        <ChatContainer>
          <div className="chat-icon">
            <i className="fas fa-user-plus"></i>
          </div>
          <div
            className="chat-details"
            onClick={() => dispatch(setSide("newGroup"))}
          >
            <p>New group</p>
          </div>
        </ChatContainer>
        {list && list.length > 0 ? (
          list.map((user) => {
            return (
              <Chat
                user={user}
                key={user._id}
                functions={() => socket(user, true)}
              />
            );
          })
        ) : (
          <NoResult
            title="There are no user connected to whatsapp"
            icon="fas fa-users-slash"
          />
        )}
      </div>
    </div>
  );
}
