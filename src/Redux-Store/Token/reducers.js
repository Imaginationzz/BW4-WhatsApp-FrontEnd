import { SET_TOKEN } from "./constants";

const tokenState = {
  access_token: null,
};

export const tokenReducer = (state = tokenState, action) => {
  let { type, payload } = action;
  switch (type) {
    case SET_TOKEN:
      return { ...state, access_token: payload };
    default:
      return state;
  }
};
