import React from "react";
import { Link } from "react-router-dom";

//REDUX IMPORTS
import { useDispatch } from "react-redux";
import { setSide } from "../../../../../../../Redux-Store/SideBar/actions";

//STYLE IMPORTS
import "./OptionsDropDown.scss";

export default function OptionsDropDown({ state }) {
  const dispatch = useDispatch();

  return (
    <div className="options" style={{ transform: state ? "" : "scale(0)" }}>
      <ul>
        <li onClick={() => dispatch(setSide("newGroup"))}>New Group</li>
        <li onClick={() => dispatch(setSide("messenger"))}>Create a room</li>
        <li onClick={() => dispatch(setSide("profile"))}>Profile</li>
        <li onClick={() => dispatch(setSide("archive"))}>Archived</li>
        <li onClick={() => dispatch(setSide("star-msgList"))}>Starred</li>
        <li onClick={() => dispatch(setSide("settings"))}>Settings</li>
        <li>
          <Link to="/">Log out</Link>
        </li>
      </ul>
    </div>
  );
}
