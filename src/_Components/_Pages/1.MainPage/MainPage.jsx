import React, { useState, useEffect } from "react";

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";

//SOCKET IMPORTS
import io from "socket.io-client";

//UTILITIES IMPORTS
import { socketConnection, getAllMembers } from "./utilities";

//REDUX ACTIONS
import { setUserList } from "../../../Redux-Store/_Users/actions";

//PERSONAL COMPONENTS IMPORTS
import SideBar from "./Sub_Components/SideBar/SideBar";
import ChatBox from "./Sub_Components/ChatBox/ChatBox";

//BOOTSTRAP IMPORTS
import { Row, Col, Alert } from "react-bootstrap";

//STYLE IMPORTS
import "./MainPage.scss";

export default function MainPage(props) {
  //STATES
  const [allowed, setAllowed] = useState(false);
  //REDUX STATES
  const userState = useSelector((state) => state.userState);
  const tokenState = useSelector((state) => state.tokenState);
  //REDUX DISPATCH
  const dispatch = useDispatch();

  //SOCKET CONNECTION
  let socket;
  if (allowed) {
    let userId = userState.user._id;
    socket = socketConnection(userId, io);
  }

  useEffect(() => {
    (async () => {
      if (userState.user) {
        setAllowed(true);
        const allMembers = await getAllMembers(
          tokenState.access_token.access_token
        );
        dispatch(setUserList(allMembers));
      } else {
        setAllowed(false);
        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      }
    })();
  }, []);

  return (
    <div id="main-page">
      {allowed ? null : (
        <Alert variant="danger">
          <i className="fas fa-exclamation-triangle"></i>
          You are not allowed!!! Get logged in first please.
        </Alert>
      )}
      <Row>
        <Col xs={12} md={4}>
          <SideBar />
        </Col>
        <Col xs={12} md={8}>
          <ChatBox />
        </Col>
      </Row>
    </div>
  );
}
