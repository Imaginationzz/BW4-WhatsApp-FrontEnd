import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

//PERSONAL COMPONENTS IMPORTS
import RouterWeb from "./_Components/_General_Components/0.RouterWeb/RouterWeb";

//REDUX IMPORTS
import { Provider } from "react-redux";
import { storeConfig } from "./Redux-Store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeConfig}>
      <RouterWeb />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
