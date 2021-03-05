import React from "react";

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import { setSide } from "../../../../../../../Redux-Store/SideBar/actions";

//PERSONAL COMPONENTS IMPORTS
import Headers from "../Headers/Headers";
import NoResult from "../NoResult/NoResult";

//STYLE IMPORTS
import "./Archived.scss";

export default function Archived() {
  //REDUX STATE
  const userState = useSelector((state) => state.userState);
  const sideState = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();

  const archiveMsg = userState.archive;
  return (
    <div
      className="archive"
      style={{ marginLeft: sideState === "archive" ? "" : "-100%" }}
    >
      <Headers
        title="Archived"
        functions={() => dispatch(setSide("sidebar"))}
      />
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
