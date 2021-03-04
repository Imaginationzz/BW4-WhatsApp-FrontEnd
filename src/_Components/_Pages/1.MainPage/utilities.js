//SOCKET CONNECTION OPTIONS
export const socketConnection = (io) => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  // console.log(userId);
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
export const createRoom = async (roomName, users, picture) => {
  let members = users.map((user) => {
    return user.user._id;
  });
  let body;
  if (picture) {
    body = {
      roomPicture: picture,
      roomName,
      membersList: members,
    };
  } else {
    body = {
      roomName,
      membersList: members,
    };
  }
  let response = await fetch(`${process.env.REACT_APP_URL_DEV}/rooms`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  let result = await response.json();
  // console.log("utils 54", roomName, users);
  return result;
};

//GET ROOM
export const getRoom = async (roomId) => {
  let response = await fetch(
    `${process.env.REACT_APP_URL_DEV}/rooms/${roomId}`
  );
  let result = await response.json();
  return result;
};
