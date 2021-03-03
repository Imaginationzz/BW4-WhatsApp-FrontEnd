//SOCKET CONNECTION OPTIONS
export const socketConnection = (userId, io) => {
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
