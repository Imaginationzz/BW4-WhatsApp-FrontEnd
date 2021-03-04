import React from "react";

//REDUX IMPORTS
import { useSelector } from "react-redux";

//PERSONAL COMPONENTS IMPORTS
import Headers from "../Headers/Headers";

//STYLE IMPORTS
import "./Settings.scss";
import SettingOption from "./Sub_Components/SettingOption/SettingOption";

export default function Settings({ state, functions }) {
  const userState = useSelector((state) => state.userState);
  const currentUser = userState.user;

  return (
    <div
      id="settings"
      style={{ marginLeft: state === "settings" ? "" : "-100%" }}
    >
      <Headers title="Settings" functions={() => functions("sidebar")} />
      <div className="current-user"></div>
      <SettingOption
        title="Notifications"
        icon="fas fa-bell"
        functions={() => functions("notifications")}
      />
      <SettingOption
        title="Theme"
        icon="fas fa-eye-dropper"
        functions={() => functions("theme")}
      />
      <SettingOption
        title="Chat Wallpaper"
        icon="far fa-image"
        functions={() => functions("wallpaper")}
      />
      <SettingOption
        title="Blocked"
        icon="fas fa-ban"
        functions={() => functions("blocked")}
      />
      <SettingOption
        title="Desktop Setting"
        icon="fas fa-desktop"
        functions={() => functions("desktop")}
      />
      <SettingOption
        title="Help"
        icon="far fa-question-circle"
        functions={() => functions("help")}
      />
    </div>
  );
}
