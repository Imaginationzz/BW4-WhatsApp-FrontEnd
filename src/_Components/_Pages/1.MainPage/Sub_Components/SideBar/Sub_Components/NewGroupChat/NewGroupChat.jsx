import React, { useState, useEffect } from "react";

//PERSONAL COMPONENTS IMPORTS
import { ChatContainer } from "../Chat/Chat";
import Chat from "../Chat/Chat";

//REDUX IMPORTS
import { useSelector } from "react-redux";

//STYLE IMPORTS
import "./NewGroupChat.scss";
import Headers from "../Headers/Headers";
import NoResult from "../NoResult/NoResult";

export default function NewGroupChat({ state, functions }) {
  //STATE
  const [list, setList] = useState([]);
  //REDUX STATE
  const userState = useSelector((state) => state.userState);
  const userList = userState.userList;

  useEffect(() => {
    setList(userList);
  }, [state]);

  //FILTER USERS
  const searchUser = (e) => {
    if (e.currentTarget.value !== "") {
      setList(
        list.filter((user) => user.username.includes(e.currentTarget.value))
      );
    } else {
      setList(userList);
    }
  };
  return (
    <div
      className="newGroup"
      style={{ marginLeft: state === "newGroup" ? "" : "-100%" }}
    >
      <Headers
        title="Add group participants"
        functions={() => functions("sidebar")}
      />
      <div className="searchbar">
        <input
          type="text"
          placeholder="Type contact name"
          onChange={searchUser}
        />
      </div>
      <div className="contacts">
        {list && list.length > 0 ? (
          list.map((user) => {
            return <Chat user={user} key={user._id} />;
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
