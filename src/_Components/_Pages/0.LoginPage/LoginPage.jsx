import React, { useState } from "react";

//UTILITIES IMPORTS
import { checkValidity } from "./utilities";

//PERSONAL COMPONENTS IMPORTS
import LoginForm from "./Sub_Components/LoginForm/LoginForm";
import SignInForm from "./Sub_Components/SignInForm/SignInForm";
import { LoginPageBG } from "../../_General_Components/1.Backgrounds/Backgrounds";
//BOOTSTRAP IMPORTS
//STYLE IMPORTS
import "./LoginPage.scss";

export default function LoginPage() {
  const [form, setForm] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (e) => {
    checkValidity(e);
    setIsValid(true);
    console.log("hey");
  };

  return (
    <>
      <LoginPageBG />
      <div id="login-page">
        <div className="login-container">
          <header>
            <img src="./assets/logo.png" alt="" />
            Chat on WhatsApp from your Browser
          </header>
          <hr />
          <LoginForm
            state={{ form, isValid }}
            functions={{ changeForm: () => setForm(true), handleSubmit }}
          />
          <SignInForm
            state={{ form, isValid }}
            functions={{ changeForm: () => setForm(false), handleSubmit }}
          />
        </div>
      </div>
    </>
  );
}
