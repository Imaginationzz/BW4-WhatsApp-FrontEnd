import React, { useState, useEffect } from "react";

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";

//SOCKET IMPORTS
import io from "socket.io-client";

//UTILITIES IMPORTS

import {
  getAllMembers,
  createRoom,
  getRoom,
  checkRooms,
  checkOneRoom,
} from "./utilities";
import { getRooms } from "./Sub_Components/SideBar/utilities";

//REDUX ACTIONS
import { setUserList } from "../../../Redux-Store/_Users/actions";
import { setChat, setChatList } from "../../../Redux-Store/Chat/actions";
import { setSide } from "../../../Redux-Store/SideBar/actions";

//PERSONAL COMPONENTS IMPORTS
import SideBar from "./Sub_Components/SideBar/SideBar";
import ChatBox from "./Sub_Components/ChatBox/ChatBox";
import ContactList from "./Sub_Components/SideBar/Sub_Components/ContactList/ContactList";
import NewGroupChat from "./Sub_Components/SideBar/Sub_Components/NewGroupChat/NewGroupChat";
import Archived from "./Sub_Components/SideBar/Sub_Components/Archived/Archived";
import StarMsg from "./Sub_Components/SideBar/Sub_Components/StarMsg/StarMsg";
import Settings from "./Sub_Components/SideBar/Sub_Components/Settings/Settings";
import Notifications from "./Sub_Components/SideBar/Sub_Components/Settings/Sub_Components/Notifications/Notifications";
import ProfileEdit from "./Sub_Components/SideBar/Sub_Components/3.Profile/Profile";
import ThemeModal from "./Sub_Components/Modal/ThemeModal";
import GroupInfo from "./Sub_Components/SideBar/Sub_Components/NewGroupChat/Sub_Components/GroupInfo/GroupInfo";

//BOOTSTRAP IMPORTS
import { Row, Col, Alert } from "react-bootstrap";

//STYLE IMPORTS
import "./MainPage.scss";

const connOpt = {
  transports: ["websocket", "polling"],
};
let socket = io(process.env.REACT_APP_URL_DEV, connOpt);
// }

export default function MainPage(props) {
  //STATES

  const [allowed, setAllowed] = useState(false);
  const [sideBar, setSideBar] = useState("sidebar");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [counters, setCounters] = useState(0);

  //REDUX STATES
  const userState = useSelector((state) => state.userState);
  const tokenState = useSelector((state) => state.tokenState);
  const chatState = useSelector((state) => state.chatState);

  //REDUX DISPATCH
  const dispatch = useDispatch();

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
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
      let rooms = await getRooms(userId);
      let reversed = rooms.reverse();
      await dispatch(setChatList(reversed));
    })();
    socket.on("message", (msg) =>
      setMessages((messages) => messages.concat(msg))
    );
    setTimeout(() => {
      setCounters(counters + 1);
    }, 500);
  }, []);

  useEffect(() => {
    (async () => {
      await chatState.chatList.forEach((chat) => {
        socket.emit("joinRoom", {
          roomId: chat._id,
          username: userState.user._id,
        });
      });
    })();
  }, [chatState.chatList]);

  useEffect(() => {
    (async () => {
      if (chatState.current_chat) {
        setMessages([]);
        socket.emit("joinRoom", {
          roomId: chatState.current_chat._id,
          username: userState.user._id,
        });
        const room = await getRoom(chatState.current_chat._id);
        setMessages(room.messages);
      }
    })();
  }, [chatState.current_chat]);

  const createChat = async (user, isPrivate, groupPic, roomName) => {
    let usersId;
    let roomPic;
    if (isPrivate) {
      usersId = [{ user }, { user: userState.user }];
      roomPic = user.picture;
    } else {
      usersId = user.map((user) => {
        return { user: user };
      });
      groupPic ? (roomPic = groupPic) : (roomPic = null);
    }
    // console.log(usersId);
    const isOk = await checkRooms(usersId);
    // console.log(isOk);
    let room;
    if (isOk.length > 0) {
      room = isOk[0];
    } else {
      isPrivate
        ? (room = await createRoom(user.username, usersId, roomPic))
        : (room = await createRoom(roomName, usersId, roomPic));
    }
    // await setChat.current_chat(room);
    dispatch(setChat(room));
    dispatch(setSide("sidebar"));
  };

  // const joinChat = async (room) => {
  //   dispatch(setChat(room));
  //   let users = room.membersList.map((user) => {
  //     return { user: user };
  //   });
  //   let allConnected = await checkOneRoom(users, room._id);

  // };

  const handleMessage = async (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      setMessage("");
      socket.emit("chat", { message, roomId: chatState.current_chat._id });
    } else {
      setMessage(e.currentTarget.value);
    }
  };

  const handleImage = async (data) => {
    console.log("piped data", data);

    const reader = new FileReader();
    reader.addEventListener("load", function () {
      // const b64 = reader.result.replace(/^data:.+;base64,/, "")
      // const bytes = new Uint8Array(reader.result)

      //b64.string will show the stringified

      socket.emit("image", {
        roomId: chatState.current_chat._id,
        image: reader.result,
      });
    });
    reader.readAsDataURL(data);
  };

  const leaveRoom = async (roomId) => {
    socket.emit("leaveRoom", {
      roomId,
      userId: userState.user._id,
    });
  };

  return (
    <div id="main-page">
      {allowed ? null : (
        <Alert variant="danger">
          <i className="fas fa-exclamation-triangle"></i>
          You are not allowed!!! Get logged in first please.
        </Alert>
      )}
      <ThemeModal state={modal} functions={() => setModal(!modal)} />
      <Row>
        <Col xs={12} md={4}>
          <SideBar functions={{ leaveRoom }} messages={messages} />
          <ContactList socket={createChat} />
          <NewGroupChat
            groupMembers={groupMembers}
            setGroupMembers={setGroupMembers}
          />
          <Archived />
          <StarMsg />
          <Settings functions={{ setModal: () => setModal(!modal) }} />
          <Notifications />
          <ProfileEdit state={sideBar} functions={setSideBar} />
          <GroupInfo
            socket={{
              joinRoom: () =>
                createChat(
                  groupMembers.concat(userState.user),
                  false,
                  null,
                  groupName
                ),
            }}
            groupName={groupName}
            setGroupName={setGroupName}
          />
        </Col>
        <Col xs={12} md={8}>
          <ChatBox
            functions={handleMessage}
            inputMsg={message}
            handleImage={handleImage}
            messages={messages}
            setMessage={setMessage}
          />
        </Col>
      </Row>
    </div>
  );
}
