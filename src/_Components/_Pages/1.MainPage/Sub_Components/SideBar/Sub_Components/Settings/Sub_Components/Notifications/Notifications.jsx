import React from "react";

//PERSONAL COMPONENTS IMPORTS
import Headers from "../../../Headers/Headers";
//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import { setSide } from "../../../../../../../../../Redux-Store/SideBar/actions";

//STYLE IMPORTS
import "./Notifications.scss";

export default function Notifications() {
  const sideState = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();

  return (
    <div
      className="notifications"
      style={{ marginLeft: sideState === "notifications" ? "" : "-100%" }}
    >
      <Headers
        title="Notifications"
        functions={() => dispatch(setSide("settings"))}
      />
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
