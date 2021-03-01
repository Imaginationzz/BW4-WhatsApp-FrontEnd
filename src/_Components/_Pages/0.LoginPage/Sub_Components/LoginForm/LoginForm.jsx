import React from "react";

//DATA IMPORTS
import formDetails from "./formDetails.json";

//PERSONAL COMPONENTS IMPORTS
import CheckInputs from "../CheckInputs/CheckInputs";

//BOOTSTRAP IMPORTS
import { Form } from "react-bootstrap";
//STYLE IMPORTS
import "./LoginForm.scss";

export default function LoginForm({ state, functions }) {
  return (
    <div
      id="login-form"
      style={{ display: state.form ? "none" : "" }}
      validated={state.isValid}
      onSubmit={functions.handleSubmit}
    >
      <Form noValidate>
        {formDetails.map((input) => {
          return <CheckInputs formDetails={input} />;
        })}
        <p onClick={functions.changeForm}>Not registered yet?</p>
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
