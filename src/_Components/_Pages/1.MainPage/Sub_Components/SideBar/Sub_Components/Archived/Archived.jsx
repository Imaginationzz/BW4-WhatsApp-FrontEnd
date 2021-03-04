import React from "react";

//REDUX IMPORTS
import { useSelector } from "react-redux";

//PERSONAL COMPONENTS IMPORTS
import Headers from "../Headers/Headers";
import NoResult from "../NoResult/NoResult";

//STYLE IMPORTS
import "./Archived.scss";

export default function Archived({ state, functions }) {
  //REDUX STATE
  const userState = useSelector((state) => state.userState);
  const archiveMsg = userState.archive;
  return (
    <div
      className="archive"
      style={{ marginLeft: state === "archive" ? "" : "-100%" }}
    >
      <Headers title="Archived" functions={functions} />
      <div className="archive-list">
        {archiveMsg && archiveMsg.length > 0 ? (
          <div className="msg">msg</div>
        ) : (
          <NoResult
            title="There are no archived messages."
            icon="fas fa-inbox"
          />
        )}
      </div>
    </div>
  );
}
