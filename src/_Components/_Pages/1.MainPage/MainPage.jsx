import React, { useState, useEffect } from "react";

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";

//SOCKET IMPORTS
import io from "socket.io-client";

//UTILITIES IMPORTS
import { socketConnection, getAllMembers, joinRoom } from "./utilities";

//REDUX ACTIONS
import { setUserList } from "../../../Redux-Store/_Users/actions";

//PERSONAL COMPONENTS IMPORTS
import SideBar from "./Sub_Components/SideBar/SideBar";
import ChatBox from "./Sub_Components/ChatBox/ChatBox";
import ContactList from "./Sub_Components/SideBar/Sub_Components/ContactList/ContactList";
import NewGroupChat from "./Sub_Components/SideBar/Sub_Components/NewGroupChat/NewGroupChat";

//BOOTSTRAP IMPORTS
import { Row, Col, Alert } from "react-bootstrap";

//STYLE IMPORTS
import "./MainPage.scss";

let socket;

export default function MainPage(props) {
  //STATES
  const [allowed, setAllowed] = useState(false);
  const [sideBar, setSideBar] = useState("sidebar");
  //REDUX STATES
  const userState = useSelector((state) => state.userState);
  const tokenState = useSelector((state) => state.tokenState);
  const chatState = useSelector((state) => state.chatState);
  //REDUX DISPATCH
  const dispatch = useDispatch();
  //SOCKET CONNECTION
  let userId = userState.user._id;
  socket = socketConnection(userId, io);

  useEffect(() => {
    (async () => {
      if (userState.user) {
        setAllowed(true);
        const allMembers = await getAllMembers(
          tokenState.access_token.access_token
        );
        dispatch(setUserList(allMembers));

        // console.log(socket);
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
          <SideBar
            socket={socket}
            state={sideBar}
            functions={(comp) => setSideBar(comp)}
          />
          <ContactList state={sideBar} functions={setSideBar} />
          <NewGroupChat state={sideBar} functions={setSideBar} />
        </Col>
        <Col xs={12} md={8}>
          <ChatBox />
        </Col>
      </Row>
    </div>
  );
}
