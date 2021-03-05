import React, { useState } from "react";

//BOOTSTRAP IMPORTS
import { Modal, Button } from "react-bootstrap";

//STYLE IMPORTS
import "./ThemeModal.scss";

export default function ThemeModal({ state, functions }) {
  const [theme, setTheme] = useState("");

  const handleCheck = (e) => {
    if (e.currentTarget.checked) {
      setTheme(e.currentTarget.id);
    } else {
      setTheme("default");
    }
  };

  const saveTheme = () => {
    localStorage.setItem("theme", theme);
    functions();
  };

  return (
    <Modal show={state} onHide={functions}>
      <Modal.Header>
        <Modal.Title>Choose theme</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="option">
          <input type="radio" id="dark" onChange={handleCheck} />
          <label htmlFor="dark">Dark</label>
        </div>
        <div className="option">
          <input type="radio" id="light" onChange={handleCheck} />
          <label htmlFor="light">Light</label>
        </div>
        <div className="option">
          <input type="radio" id="default" onChange={handleCheck} />
          <label htmlFor="default">Default</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="close-btn" onClick={functions}>
          Cancel
        </Button>
        <Button className="save-btn" onClick={() => saveTheme()}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
