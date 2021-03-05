import React from "react";
import Headers from "../Headers/Headers";
import NoResult from "../NoResult/NoResult";

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import { setSide } from "../../../../../../../Redux-Store/SideBar/actions";

//STYLE IMPORTS
import "./StarMsg.scss";

export default function StarMsg() {
  //REDUX STATE
  const userState = useSelector((state) => state.userState);
  const sideState = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();

  const starredMsg = userState.starred;
  return (
    <div
      className="star-msgList"
      style={{ marginLeft: sideState === "star-msgList" ? "" : "-100%" }}
    >
      <Headers
        title="Starred Messages"
        functions={() => dispatch(setSide("sidebar"))}
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
