import React from "react";

//STYLE IMPORTS
import "./NoResult.scss";

export default function NoResult({ title, icon }) {
  return (
    <div className="no-result">
      <div className="icon-container">
        <i className={`${icon}`}></i>
      </div>
      <p>{title}</p>
    </div>
  );
}
