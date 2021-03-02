import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatBoard from "../../_Pages/ChatBoard/ChatBoard"

//PERSONAL COMPONENTS IMPORTS
//PAGES OR NAVBAR(COMPONENTS TO BE DISPLAYED IN ALL PAGES)

//STYLE IMPORTS
import "./RouterWeb.scss";

export default function RouterWeb() {
  return (
    <Router>
      <Switch>
        <Route   path="/chatboard" exact component={ChatBoard}/>
      </Switch>
    </Router>
  );
}
