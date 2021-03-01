import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//PERSONAL COMPONENTS IMPORTS
import LoginPage from "../../_Pages/0.LoginPage/LoginPage";

//STYLE IMPORTS
import "./RouterWeb.scss";

export default function RouterWeb() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={(props) => <LoginPage {...props} />} />
      </Switch>
    </Router>
  );
}
