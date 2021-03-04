import React from "react";
import Headers from "../Headers/Headers";
import NoResult from "../NoResult/NoResult";

//REDUX IMPORTS
import { useSelector } from "react-redux";
//STYLE IMPORTS
import "./StarMsg.scss";

export default function StarMsg({ state, functions }) {
  //REDUX STATE
  const userState = useSelector((state) => state.userState);
  const starredMsg = userState.starred;
  return (
    <div
      className="star-msgList"
      style={{ marginLeft: state === "star-msgList" ? "" : "-100%" }}
    >
      <Headers
        title="Starred Messages"
        functions={() => functions("sidebar")}
      />
      <div className="starred-list">
        {starredMsg && starredMsg.length > 0 ? (
          <div className="msg">msg</div>
        ) : (
          <NoResult
            title="There are no archived messages."
            icon="fas fa-star"
          />
        )}
      </div>
    </div>
  );
}
