import React, { useState } from "react";

//UTILITIES IMPORTS
import {
  checkValidity,
  handleOnChange,
  loginState,
  signInState,
  createUser,
  authorizeUser,
} from "./utilities";

//REDUX IMPORTS
import { useDispatch } from "react-redux";
import { setToken } from "../../../Redux-Store/Token/actions";
import { setUser } from "../../../Redux-Store/_Users/actions";

//PERSONAL COMPONENTS IMPORTS
import LoginForm from "./Sub_Components/LoginForm/LoginForm";
import SignInForm from "./Sub_Components/SignInForm/SignInForm";
import { LoginPageBG } from "../../_General_Components/1.Backgrounds/Backgrounds";
//BOOTSTRAP IMPORTS
//STYLE IMPORTS
import "./LoginPage.scss";

export default function LoginPage(props) {
  const [form, setForm] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [login, setLogin] = useState(loginState);
  const [signIn, setSignIn] = useState(signInState);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    checkValidity(e);
    setIsValid(true);
    if (form) {
      let result = await createUser(signIn);
      dispatch(setToken(result.access_token));
      dispatch(setUser(result.user));
      props.history.push(`/main-page/?userId=${result.user._id}`);
    } else {
      let loginResult = await authorizeUser(login);
      // const result = await authorizeUser(login);
      dispatch(setToken(loginResult.access_token));
      dispatch(setUser(loginResult.user));
      props.history.push(`/main-page/?userId=${loginResult.user._id}`);
    }
  };

  const fillForm = (e) => {
    let state;
    if (form) {
      state = signIn;
      let filledForm = handleOnChange(e, state);
      setSignIn(filledForm);
    } else {
      state = login;
      let filledForm = handleOnChange(e, state);
      setLogin(filledForm);
    }
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
            functions={{
              changeForm: () => setForm(true),
              handleSubmit,
              fillForm,
            }}
          />
          <SignInForm
            state={{ form, isValid }}
            functions={{
              changeForm: () => setForm(false),
              handleSubmit,
              fillForm,
            }}
          />
        </div>
      </div>
    </>
  );
}
