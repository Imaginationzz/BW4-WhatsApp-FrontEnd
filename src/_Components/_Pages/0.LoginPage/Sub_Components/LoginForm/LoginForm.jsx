import React from "react";

//DATA IMPORTS
import formDetails from "./formDetails.json";

//PERSONAL COMPONENTS IMPORTS
import CheckInputs from "../CheckInputs/CheckInputs";

//BOOTSTRAP IMPORTS
import { Form, Row, Col } from "react-bootstrap";
//STYLE IMPORTS
import "./LoginForm.scss";

export default function LoginForm({ state, functions }) {
  return (
    <div id="login-form" style={{ display: state.form ? "none" : "" }}>
      <Row className="socials">
        <Col md={6}>
          <button className="social-btn">
            <i class="fab fa-google"></i>
            <a href="http://localhost:5000/users/googleLogin">
              Log in with Google
            </a>
          </button>
        </Col>
        <Col md={6}>
          <button className="social-btn">
            <i class="fab fa-facebook"></i>
            <a href="http://localhost:5000/users/facebookLogin">
              Log in with Facebook
            </a>
          </button>
        </Col>
      </Row>
      <Form
        noValidate
        validated={state.isValid}
        onSubmit={functions.handleSubmit}
      >
        {formDetails.map((input) => {
          return (
            <CheckInputs
              formDetails={input}
              key={input.id}
              functions={functions.fillForm}
            />
          );
        })}
        <p onClick={functions.changeForm}>Not registered yet?</p>
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
