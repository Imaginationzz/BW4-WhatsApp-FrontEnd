import { SET_USER } from "./constants";

const initialState = {
  user: null,
};

export const userReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case SET_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};
