import React, { useState, useEffect } from "react"

//REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux"

//SOCKET IMPORTS
import io from "socket.io-client"

//UTILITIES IMPORTS
import {
  socketConnection,
  getAllMembers,
  createRoom,
  getRoom,
  saveMessage,
} from "./utilities"

//REDUX ACTIONS
import { setUserList } from "../../../Redux-Store/_Users/actions"

//PERSONAL COMPONENTS IMPORTS
import SideBar from "./Sub_Components/SideBar/SideBar"
import ChatBox from "./Sub_Components/ChatBox/ChatBox"
import ContactList from "./Sub_Components/SideBar/Sub_Components/ContactList/ContactList"
import NewGroupChat from "./Sub_Components/SideBar/Sub_Components/NewGroupChat/NewGroupChat"
import Archived from "./Sub_Components/SideBar/Sub_Components/Archived/Archived"
import StarMsg from "./Sub_Components/SideBar/Sub_Components/StarMsg/StarMsg"
import Settings from "./Sub_Components/SideBar/Sub_Components/Settings/Settings"
import Notifications from "./Sub_Components/SideBar/Sub_Components/Settings/Sub_Components/Notifications/Notifications"

//BOOTSTRAP IMPORTS
import { Row, Col, Alert } from "react-bootstrap"

//STYLE IMPORTS
import "./MainPage.scss"
import ProfileEdit from "./Sub_Components/SideBar/Sub_Components/3.Profile/Profile"

// const urlParams = new URLSearchParams(window.location.search);
// const userId = urlParams.get("userId");
// let socket;
// if (!userId) {
//   socket = null;
// } else {
const connOpt = {
  transports: ["websocket", "polling"],
}
let socket = io(process.env.REACT_APP_URL_DEV, connOpt)
// }

export default function MainPage(props) {
  //STATES
  const [counter, setCounter] = useState(0)
  const [allowed, setAllowed] = useState(false)
  const [sideBar, setSideBar] = useState("sidebar")
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  //REDUX STATES
  const userState = useSelector((state) => state.userState)
  const tokenState = useSelector((state) => state.tokenState)
  const chatState = useSelector((state) => state.chatState)
  //REDUX DISPATCH
  const dispatch = useDispatch()
  //SOCKET CONNECTION

  useEffect(() => {
    ;(async () => {
      if (userState.user) {
        setAllowed(true)
        const allMembers = await getAllMembers(
          tokenState.access_token.access_token
        )
        console.log("All members", allMembers)
        dispatch(setUserList(allMembers))
        setCounter(counter + 1)
      } else {
        setAllowed(false)
        setTimeout(() => {
          props.history.push("/")
        }, 3000)
      }
    })()
    socket.on("message", (msg) =>
      setMessages((messages) => messages.concat(msg))
    )
    // console.log(socket);
    //socket.on("connect", () => console.log("Connected"));
  }, [])

  useEffect(() => {
    ;(async () => {
      if (currentChat) {
        setMessages([])
        socket.emit("joinRoom", {
          roomId: currentChat._id,
          username: userState.user._id,
        })
        const room = await getRoom(currentChat._id)
        setMessages(room.messages)

        // socket.emit("leaveRoom", { roomId: currentChat._id });
      }
    })()
  }, [currentChat])

  const joinRoom = async (user, isPrivate) => {
    let usersId = [{ user }, { user: userState.user }]
    let roomPic
    isPrivate ? (roomPic = user.picture) : (roomPic = null)
    const newRoom = await createRoom(user.username, usersId, roomPic)
    setCurrentChat(newRoom)
    setSideBar("sidebar")
  }

  const handleMessage = async (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      setMessage("")
      socket.emit("chat", { message, roomId: currentChat._id })
    } else {
      setMessage(e.currentTarget.value)
    }
  }

  const handleImage = async (data) => {
    console.log("piped data", data)

    const reader = new FileReader()
    reader.addEventListener("load", function () {
      // const b64 = reader.result.replace(/^data:.+;base64,/, "")
      // const bytes = new Uint8Array(reader.result)

      //b64.string will show the stringified

      socket.emit("image", { roomId: currentChat._id, image: reader.result })
    })
    reader.readAsDataURL(data)
  }

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
            state={sideBar}
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
          <ProfileEdit state={sideBar} functions={setSideBar} />
        </Col>
        <Col xs={12} md={8}>
          <ChatBox
            functions={handleMessage}
            state={currentChat}
            messages={messages}
            inputMsg={message}
            handleImage={handleImage}
          />
        </Col>
      </Row>
    </div>
  )
}
