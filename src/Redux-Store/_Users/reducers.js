import { SET_USER, SET_USERLIST } from "./constants";

const initialState = {
  user: null,
  userList: [],
};

export const userReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case SET_USER:
      return { ...state, user: payload };
    case SET_USERLIST:
      return { ...state, userList: payload };
    default:
      return state;
  }
};
