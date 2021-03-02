import React from "react";

//BOOTSTRAP IMPORTS
import { Form, InputGroup } from "react-bootstrap";

//STYLE IMPORTS
import "./CheckInputs.scss";

export default function CheckInputs({ formDetails, functions }) {
  return (
    <Form.Group controlId={formDetails.id}>
      <Form.Label>{formDetails.placeholder}</Form.Label>
      <InputGroup hasValidation>
        <Form.Control
          required
          type={formDetails.type}
          // id={formDetails.id}
          placeholder={formDetails.placeholder}
          onChange={functions}
        />
        <Form.Control.Feedback type="invalid">
          {formDetails.feedback.invalid}
        </Form.Control.Feedback>
        <Form.Control.Feedback type="valid">
          {formDetails.feedback.valid}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}
