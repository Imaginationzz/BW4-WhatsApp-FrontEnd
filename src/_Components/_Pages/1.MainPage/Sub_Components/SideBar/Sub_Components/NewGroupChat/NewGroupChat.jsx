import React, { useState, useEffect } from "react";

//PERSONAL COMPONENTS IMPORTS
import { ChatContainer } from "../Chat/Chat";
import Chat from "../Chat/Chat";

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import { setSide } from "../../../../../../../Redux-Store/SideBar/actions";

//STYLE IMPORTS
import "./NewGroupChat.scss";
import Headers from "../Headers/Headers";
import NoResult from "../NoResult/NoResult";

export default function NewGroupChat({
  socket,
  groupMembers,
  setGroupMembers,
}) {
  //STATE
  const [list, setList] = useState([]);
  // const [groupMembers, setGroupMembers] = useState([]);
  //REDUX STATE
  const userState = useSelector((state) => state.userState);
  const sideState = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();

  const userList = userState.userList.filter(
    (user) => user._id !== userState.user._id
  );

  useEffect(() => {
    setList(userList);
  }, [sideState]);

  //FILTER USERS
  const searchUser = (e) => {
    if (e.currentTarget.value !== "") {
      setList(
        list.filter((user) =>
          user.username.toLowerCase().includes(e.currentTarget.value)
        )
      );
    } else {
      setList(userList);
    }
  };

  return (
    <div
      className="newGroup"
      style={{ marginLeft: sideState === "newGroup" ? "" : "-100%" }}
    >
      <Headers
        title="Add group participants"
        functions={() => dispatch(setSide("sidebar"))}
      />
      <div
        className="searchbar"
        style={{ display: groupMembers.length > 0 ? "none" : "" }}
      >
        <input
          type="text"
          placeholder="Type contact name"
          onChange={searchUser}
        />
      </div>
      <div
        className="members-in"
        style={{ display: groupMembers.length > 0 ? "" : "none" }}
      >
        {groupMembers.length > 0
          ? groupMembers.map((member) => {
              return (
                <button
                  key={member._id}
                  className="group-member"
                  onClick={() =>
                    setGroupMembers(
                      groupMembers.filter((user) => user._id !== member._id)
                    )
                  }
                >
                  {" "}
                  x {member.username}
                </button>
              );
            })
          : null}
      </div>
      <div className="contacts">
        {list && list.length > 0 ? (
          list.map((user) => {
            return (
              <Chat
                user={user}
                key={user._id}
                functions={() => setGroupMembers(groupMembers.concat(user))}
                state={groupMembers}
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
      <button
        className="create-group-chat"
        onClick={() => dispatch(setSide("group-info"))}
        style={{ display: groupMembers.length > 0 ? "" : "none" }}
      >
        Confirm
      </button>
    </div>
  );
}
