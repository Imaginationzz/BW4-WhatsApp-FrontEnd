import { SET_SIDEBAR } from "./constants";

export const sideReducer = (state = "sidebar", action) => {
  let { type, payload } = action;
  switch (type) {
    case SET_SIDEBAR:
      return (state = payload);
    default:
      return state;
  }
};
