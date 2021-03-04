import React from "react";

//STYLE IMPORTS
import "./Headers.scss";

export default function Headers({ title, functions }) {
  return (
    <div className="header">
      <div className="header-controllers">
        <i className="fas fa-arrow-left" onClick={functions}></i>
        <p>{title}</p>
      </div>
    </div>
  );
}
