//SOCKET CONNECTION OPTIONS
export const socketConnection = (io) => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  console.log(userId);
  let socket;
  if (!userId) {
    socket = null;
  } else {
    const connOpt = {
      transports: ["websocket", "polling"],
      query: { userId },
    };
    socket = io(process.env.REACT_APP_URL_DEV, connOpt);
  }
  return socket;
};

//GET ALL USERS WITH SOCKET
export const getAllMembers = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_URL_DEV}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  const onlyWithSocket = result.filter((user) => user.socketId);
  return onlyWithSocket;
};

//SEND MESSAGE
export const sendMessage = (socket, message, roomName) => {
  return socket.emit("chat", { roomName, message });
};

//CREATE ROOM
export const createRoom = async (roomName, usersId) => {
  let members = usersId.map((user) => {
    return { memberId: user };
  });
  let body = {
    roomName,
    membersList: members,
  };
  let response = await fetch(`${process.env.REACT_APP_URL_DEV}/rooms`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  let result = await response.json();
  // console.log("utils 54", result);
  return result;
};

//GET ROOM
export const getRoom = async (roomId) => {
  let response = await fetch(
    `${process.env.REACT_APP_URL_DEV}/rooms/${roomId}`
  );
  let result = await response.json();
  console.log("utils 62", result);
  return result;
};

//SAVE MESSAGE
export const saveMessage = async (body) => {
  let response = await fetch(`${process.env.REACT_APP_URL_DEV}/messages`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({ "Content-Type": "application/json" }),
  });
  let result = await response.json();
  console.log("save message", result);
  return result;
};
