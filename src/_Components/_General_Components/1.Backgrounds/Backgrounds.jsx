import React from "react";

//DATA IMPORTS
import emojis from "./emojis.json";

//UTILITIES IMPORTS
import { setEmojisRows } from "./utilities";

//BOOTSTRAP IMPORTS
import { Row, Col } from "react-bootstrap";

//STYLE IMPORTS
import "./Backgrounds.scss";

export const LoginPageBG = function () {
  const emojiRows = setEmojisRows();
  return (
    <div id="login-bg">
      <div className="bg-emoji">
        {emojiRows.map((row, i) => {
          return (
            <div className="emoji-row" key={i}>
              {row.map((emoji, i) => {
                return <i className={emoji} key={i}></i>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
