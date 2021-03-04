import React from "react";

//PERSONAL COMPONENTS IMPORTS
import Headers from "../../../Headers/Headers";

//STYLE IMPORTS
import "./Notifications.scss";

export default function Notifications({ state, functions }) {
  return (
    <div
      className="notifications"
      style={{ marginLeft: state === "notifications" ? "" : "-100%" }}
    >
      <Headers title="Notifications" functions={() => functions("settings")} />
      <ul>
        <li>
          <input type="checkbox" id="" />
          Sounds
        </li>
        <li>
          <input type="checkbox" id="" />
          Desktop Alerts
        </li>
        <li>
          <input type="checkbox" id="" />
          <div className="description">
            Show Previews
            <p>Display message text in desktop alerts</p>
          </div>
        </li>
        <li>
          <input type="checkbox" id="" />
          Turn off all desktop notifications
        </li>
      </ul>
    </div>
  );
}
