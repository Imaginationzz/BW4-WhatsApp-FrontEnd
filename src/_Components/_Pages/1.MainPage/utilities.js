//GET ALL USERS WITH SOCKET
export const getAllMembers = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_URL_DEV}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  // const onlyWithSocket = result.filter((user) => user.socketId);
  // return onlyWithSocket;
  return result;
};

//SEND MESSAGE
export const sendMessage = (socket, message, roomName) => {
  return socket.emit("chat", { roomName, message });
};

//CHECK ROOMS
export const checkRooms = async (users) => {
  let members = users.map((user) => {
    return user.user._id;
  });
  // console.log(users);
  let response = await fetch(`${process.env.REACT_APP_URL_DEV}/rooms/onlyId`);
  let result = await response.json();
  const check = await result.filter((room) => {
    const isUsed = members.every((member) => room.membersList.includes(member));
    if (isUsed) {
      return isUsed;
    }
  });
  return check;
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
