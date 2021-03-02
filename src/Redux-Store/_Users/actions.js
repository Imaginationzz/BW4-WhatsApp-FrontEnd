import { SET_USER, SET_USERLIST } from "./constants";

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setUserList = (userList) => ({
  type: SET_USERLIST,
  payload: userList,
});
