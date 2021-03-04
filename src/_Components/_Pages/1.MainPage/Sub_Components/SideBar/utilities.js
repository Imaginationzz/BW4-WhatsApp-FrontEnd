//CREATE NEW ROOM
export const createConversation = async (username, usersId, token) => {
  let room;
  let member = await getMember(token);
  let rooms = await getRooms();
  let checkRoom = rooms.filter((room) => room.roomName === username);
  let memberRooms = member.roomsId;
  if (checkRoom.length > 0) {
    let currentRoom = checkRoom[0];
    let isMemberInRoom = memberRooms.filter((room) => room === currentRoom._id);
    if (isMemberInRoom.length > 0) {
      room = currentRoom;
    } else {
      let body = { roomsId: checkRoom[0]._id };
      // console.log(body);
      let editedMember = await editMember(token, body);
      console.log("edit Success", editedMember);
      room = currentRoom;
    }
  } else {
    let newRoom = await createRoom(username, usersId);
    room = newRoom;
  }
  return room;
};

//GET ROOMSLIST
export const getRooms = async (userId) => {
  let response = await fetch(`${process.env.REACT_APP_URL_DEV}/rooms`);
  let result = await response.json();
  let userRooms = result.filter((room) =>
    room.membersList.some((member) => member.memberId === userId)
  );
  // console.log("rooms", result);
  return userRooms;
};

//GET USER
export const getMember = async (token) => {
  let response = await fetch(`${process.env.REACT_APP_URL_DEV}/users/profile`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token.access_token}` },
  });
  let result = await response.json();

  // console.log("getMember", result);
  return result;
};

//EDIT USER
export const editMember = async (token, body) => {
  let response = await fetch(`${process.env.REACT_APP_URL_DEV}/users/profile`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: new Headers({
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "application/json",
    }),
  });
  let result = await response.json();
  // console.log(body);
  // console.log("editMember", result);
  return result;
};

//CREATE ROOM
export const createRoom = async (username, usersId) => {
  let body = {
    roomName: username,
    membersList: usersId,
  };
  const response = await fetch(`${process.env.REACT_APP_URL_DEV}/rooms`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({ "Content-Type": "application/json" }),
  });
  const result = await response.json();
  // console.log("newRoom", result);
  return result;
};
