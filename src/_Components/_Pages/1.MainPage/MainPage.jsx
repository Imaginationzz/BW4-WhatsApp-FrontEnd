import React, { useState, useEffect } from "react";

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";

//SOCKET IMPORTS
import io from "socket.io-client";

//UTILITIES IMPORTS
import {
  socketConnection,
  getAllMembers,
  createRoom,
  getRoom,
  saveMessage,
} from "./utilities";

//REDUX ACTIONS
import { setUserList } from "../../../Redux-Store/_Users/actions";

//PERSONAL COMPONENTS IMPORTS
import SideBar from "./Sub_Components/SideBar/SideBar";
import ChatBox from "./Sub_Components/ChatBox/ChatBox";
import ContactList from "./Sub_Components/SideBar/Sub_Components/ContactList/ContactList";
import NewGroupChat from "./Sub_Components/SideBar/Sub_Components/NewGroupChat/NewGroupChat";
import Archived from "./Sub_Components/SideBar/Sub_Components/Archived/Archived";
import StarMsg from "./Sub_Components/SideBar/Sub_Components/StarMsg/StarMsg";
import Settings from "./Sub_Components/SideBar/Sub_Components/Settings/Settings";
import Notifications from "./Sub_Components/SideBar/Sub_Components/Settings/Sub_Components/Notifications/Notifications";

//BOOTSTRAP IMPORTS
import { Row, Col, Alert } from "react-bootstrap";

//STYLE IMPORTS
import "./MainPage.scss";

let socket = socketConnection(io);
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

export default function MainPage(props) {
  //STATES
  const [counter, setCounter] = useState(0);
  const [allowed, setAllowed] = useState(false);
  const [sideBar, setSideBar] = useState("sidebar");
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  //REDUX STATES
  const userState = useSelector((state) => state.userState);
  const tokenState = useSelector((state) => state.tokenState);
  const chatState = useSelector((state) => state.chatState);
  //REDUX DISPATCH
  const dispatch = useDispatch();
  //SOCKET CONNECTION

  useEffect(() => {
    (async () => {
      if (userState.user) {
        setAllowed(true);
        const allMembers = await getAllMembers(
          tokenState.access_token.access_token
        );
        dispatch(setUserList(allMembers));
        setCounter(counter + 1);
      } else {
        setAllowed(false);
        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      }
    })();
    // console.log(socket);
    socket.on("connect", () => console.log("Connected"));
  }, []);

  useEffect(() => {
    (async () => {
      if (currentChat) {
        setMessages([]);
        socket.emit("joinRoom", { roomId: currentChat._id });
        const room = await getRoom(currentChat._id);
        socket.on("message", (msg) =>
          setMessages((messages) => messages.concat(msg))
        );
        socket.emit("leaveRoom", { roomId: currentChat._id });
      }
    })();
  }, [currentChat]);

  const joinRoom = async (user) => {
    let usersId = [user._id, userId];
    await createRoom(user.username, usersId);
    setCurrentChat(user);

    // socket.emit("joinRoom", {roomId})
  };

  const handleMessage = async (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      socket.emit("chat", { message, roomId: currentChat._id });
      const newMessage = await saveMessage({
        text: message,
        sender: userState.user.username,
      });
    } else {
      setMessage(e.currentTarget.value);
    }
  };

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
            socket={setCurrentChat}
            functions={(comp) => setSideBar(comp)}
          />
          <ContactList
            state={sideBar}
            functions={setSideBar}
            socket={{ setChat: joinRoom }}
          />
          <NewGroupChat state={sideBar} functions={setSideBar} />
          <Archived state={sideBar} functions={setSideBar} />
          <StarMsg state={sideBar} functions={setSideBar} />
          <Settings state={sideBar} functions={setSideBar} />
          <Notifications state={sideBar} functions={setSideBar} />
        </Col>
        <Col xs={12} md={8}>
          <ChatBox
            functions={handleMessage}
            state={currentChat}
            messages={messages}
          />
        </Col>
      </Row>
    </div>
  );
}
