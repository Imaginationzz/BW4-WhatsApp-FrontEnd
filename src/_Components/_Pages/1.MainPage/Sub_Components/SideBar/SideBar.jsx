import React from "react";

//STYLE IMPORTS
import "./SideBar.scss";

export default function SideBar({ user, chatList }) {
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
        {chatList && chatList.length > 0 ? (
          chatList.map((chat) => {
            return (
              <div className="chat">
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
