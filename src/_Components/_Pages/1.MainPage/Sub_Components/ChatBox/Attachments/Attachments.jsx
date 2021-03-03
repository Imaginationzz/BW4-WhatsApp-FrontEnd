import React from "react";

//STYLE IMPORTS
import "./Attachments.scss";

export default function Attachments({ state }) {
  return (
    <div className="attachments" style={{ maxHeight: state ? "310px" : "0px" }}>
      <div className="media-icons">
        <i className="fas fa-video"></i>
      </div>
      <div className="media-icons">
        <i className="fas fa-user"></i>
      </div>
      <div className="media-icons">
        <i className="fas fa-file"></i>
      </div>
      <div className="media-icons">
        <i className="fas fa-camera"></i>
      </div>
      <div className="media-icons">
        <i className="fas fa-image"></i>
      </div>
    </div>
  );
}
