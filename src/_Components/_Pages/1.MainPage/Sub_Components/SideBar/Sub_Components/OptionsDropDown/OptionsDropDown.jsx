import React from "react";
import { Link } from "react-router-dom";

//STYLE IMPORTS
import "./OptionsDropDown.scss";

export default function OptionsDropDown({ state, functions }) {
  return (
    <div className="options" style={{ transform: state ? "" : "scale(0)" }}>
      <ul>
        <li onClick={() => functions("newGroup")}>New Group</li>
        <li onClick={() => functions("messenger")}>Create a room</li>
        <li onClick={() => functions("profile")}>Profile</li>
        <li onClick={() => functions("archive")}>Archived</li>
        <li onClick={() => functions("star-msgList")}>Starred</li>
        <li onClick={() => functions("settings")}>Settings</li>
        <li>
          <Link to="/">Log out</Link>
        </li>
      </ul>
    </div>
  );
}
