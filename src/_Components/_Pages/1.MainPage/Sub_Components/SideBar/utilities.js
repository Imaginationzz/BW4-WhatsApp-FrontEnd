//GET ROOMSLIST
export const getRooms = async (userId) => {
  let response = await fetch(`${process.env.REACT_APP_URL_DEV}/rooms`);
  let result = await response.json();
  return result;
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
