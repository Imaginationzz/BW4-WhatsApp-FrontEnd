import React from "react";

//STYLE IMPORTS
import "./SettingOption.scss";

export default function SettingOption({ icon, title, functions }) {
  return (
    <div className="setting-option" onClick={functions}>
      <i className={icon}></i>
      <p>{title}</p>
    </div>
  );
}
