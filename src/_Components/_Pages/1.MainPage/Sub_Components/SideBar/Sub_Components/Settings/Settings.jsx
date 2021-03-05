import React from "react";

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import { setSide } from "../../../../../../../Redux-Store/SideBar/actions";

//PERSONAL COMPONENTS IMPORTS
import Headers from "../Headers/Headers";

//STYLE IMPORTS
import "./Settings.scss";
import SettingOption from "./Sub_Components/SettingOption/SettingOption";

export default function Settings({ functions }) {
  const userState = useSelector((state) => state.userState);
  const sideState = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();
  const currentUser = userState.user;

  return (
    <div
      id="settings"
      style={{ marginLeft: sideState === "settings" ? "" : "-100%" }}
    >
      <Headers
        title="Settings"
        functions={() => dispatch(setSide("sidebar"))}
      />
      <div className="current-user"></div>
      <SettingOption
        title="Notifications"
        icon="fas fa-bell"
        functions={() => dispatch(setSide("notifications"))}
      />
      <SettingOption
        title="Theme"
        icon="fas fa-eye-dropper"
        functions={functions.setModal}
      />
      <SettingOption
        title="Chat Wallpaper"
        icon="far fa-image"
        functions={() => dispatch(setSide("wallpaper"))}
      />
      <SettingOption
        title="Blocked"
        icon="fas fa-ban"
        functions={() => dispatch(setSide("blocked"))}
      />
      <SettingOption
        title="Desktop Setting"
        icon="fas fa-desktop"
        functions={() => dispatch(setSide("desktop"))}
      />
      <SettingOption
        title="Help"
        icon="far fa-question-circle"
        functions={() => dispatch(setSide("help"))}
      />
    </div>
  );
}
