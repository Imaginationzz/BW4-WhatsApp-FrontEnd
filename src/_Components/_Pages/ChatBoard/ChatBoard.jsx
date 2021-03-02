import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatBoard.css";
import io from "socket.io-client";
import {InputGroup, FormControl, Button,Row,Col } from "react-bootstrap";

const connOpt = {
  transports: ["websocket", "polling"],
};

let socket = io("http://localhost:5000", connOpt);

function ChatBoard() {
  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [connectedUser, setConnectedUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null)
 
  let userId='603e1cd906d1ad5c50a8db9a'

  useEffect(() => {
    socket.emit('getUser', (userId))
    socket.on("message", (msg) => setMessages((messages) => messages.concat(msg)));
    socket.emit("defaultJoin",({username:"yazid"}))
    
    //socket.on("membersList", (membersList) => console.log(membersList.list))
   
    socket.on('membersList', (membersList) => {setConnectedUsers(membersList.list)
      
    })
    
    

    socket.on("connect", () => console.log("connected to socket"));
  }, []);

  const handleMessage = (e) => {
    setMessage(e.currentTarget.value);
  };

  const sendMessage = () => {
    if (message !== "") {
      socket.emit("chat", {
       roomName:"WhatsApp_default",
        message: message,
      });

      setMessage("");
    }
  };

  

  return (
    
     <div className="mainPage">
       <Row>
         <Col xs={4}>
           <div className="header">
             <img src="" alt=""/>
             <div className="header-controllers">
             <i className="fas fa-sync"></i>
               <i className="far fa-comment"></i>
               <i className="fas fa-ellipsis-v"></i>
             </div>
           </div>
           <div className="search-bar">
           <i className="fas fa-search"></i>
             <input type="text" placeholder='Search'/>
           </div>
            <div className="users-list">
              {connectedUsers.map(user => {
                return(
                  <div className="user" key={user.id}>
                    <img src="" alt=""/>
                    <div className="chat-details" onClick={()=>setSelectedChat(user)}>
                      <p>{user.username}</p>
                      <p>most recent message</p>
                    </div>
                  </div>
                )
              })}
            </div>
         </Col>
         <Col xs={8}>
           <div className="chat-box">
             {messages.map(msg => {
               return(
                 <div className="msg">
                   <p className="sender">{msg.sender}</p>
                   <p className="text">{msg.text}</p>
                 </div>
               )
             })}
           </div>
           <div className="send-message">
             <input type="text" onChange={handleMessage}/>
             <button onClick={()=>sendMessage()}>Send</button>
           </div>
         </Col>
       </Row>

     </div>
    
        
   
  );
}

export default ChatBoard;
