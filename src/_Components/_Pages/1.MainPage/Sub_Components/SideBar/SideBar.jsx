import React from "react";

//REDUX IMPORTS
import { useSelector } from "react-redux";

//STYLE IMPORTS
import "./SideBar.scss";

export default function SideBar({ user, chatList }) {
  const userState = useSelector((state) => state.userState);

  return (
    <div id="sidebar">
      <div className="header">
        <img src="" alt="" />
        <div className="header-controllers">
          <i className="fas fa-sync"></i>
          <i className="far fa-comment"></i>
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </div>
      <div className="searchbar">
        <div className="search-container">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="chat-list">
        {userState.userList && userState.userList.length > 0 ? (
          userState.userList.map((chat) => {
            return (
              <div className="chat" key={chat._id}>
                <img src="" alt="" />
                <p>Name</p>
                <p>Last Msg</p>
              </div>
            );
          })
        ) : (
          <p className="no-result">No Chats are here</p>
        )}
      </div>
    </div>
  );
}
