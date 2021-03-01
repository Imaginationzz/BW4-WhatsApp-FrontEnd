import React from "react";

//DATA IMPORTS
import formDetails from "./formDetails.json";

//PERSONAL COMPONENTS IMPORTS
import CheckInputs from "../CheckInputs/CheckInputs";

//BOOTSTRAP IMPORTS
import { Row, Col, Form } from "react-bootstrap";

//STYLE IMPORTS
import "./SignInForm.scss";

export default function SignInForm({ state, functions }) {
  return (
    <div id="signin-form" style={{ display: state.form ? "" : "none" }}>
      <Form
        noValidate
        validated={state.isValid}
        onSubmit={functions.handleSubmit}
      >
        <Row>
          <Col md={6}>
            {formDetails.slice(0, 3).map((form, i) => {
              return <CheckInputs formDetails={form} key={i} />;
            })}
          </Col>
          <Col md={6}>
            {formDetails.slice(3, 6).map((form, i) => {
              return <CheckInputs formDetails={form} key={i} />;
            })}
          </Col>
        </Row>
        <p onClick={functions.changeForm}>Already registered?</p>
        <Row className="socials">
          <Col md={6}>
            <button className="social-btn">
              <i class="fab fa-google"></i>
              Log in with Google
            </button>
          </Col>
          <Col md={6}>
            <button className="social-btn">
              <i class="fab fa-facebook"></i>
              Log in with Facebook
            </button>
          </Col>
        </Row>
        <Row>
          <button type="submit">Join WhatsApp Web</button>
        </Row>
      </Form>
    </div>
  );
}
