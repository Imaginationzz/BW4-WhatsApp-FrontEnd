import React, { useState } from "react";

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import { setSide } from "../../../../../../../../../Redux-Store/SideBar/actions";

//PERSONAL COMPONENTS IMPORTS
import Headers from "../../../Headers/Headers";

//STYLE IMPORTS
import "./GroupInfo.scss";

export default function GroupInfo({ socket, groupName, setGroupName }) {
  //REDUX STATE
  const userState = useSelector((state) => state.userState);
  const sideState = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();
  return (
    <div
      className="group-info"
      style={{ marginLeft: sideState === "group-info" ? "" : "-100%" }}
    >
      <Headers
        title="Group Info"
        functions={() => dispatch(setSide("newGroup"))}
      />
      <div className="group-form">
        <div class="image-upload">
          <label for="file-input">
            <i className="fas fa-camera"></i>
          </label>

          <input id="file-input" type="file" />
        </div>

        <input
          type="text"
          placeholder="Group Topic..."
          onChange={(e) => setGroupName(e.currentTarget.value)}
        />
        <i
          className="fas fa-check-circle"
          style={{ transform: groupName !== "" ? "" : "scale(0)" }}
          onClick={socket.joinRoom}
        ></i>
      </div>
    </div>
  );
}
