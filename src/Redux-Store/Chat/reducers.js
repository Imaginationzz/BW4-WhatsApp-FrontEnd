import { SET_CHATLIST, SET_CURRENT_CHAT, SET_MESSAGES_LIST } from "./constants";

const chatState = {
  chatList: [],
  current_chat: null,
  messagesList: [],
};

export const chatReducer = (state = chatState, action) => {
  let { type, payload } = action;
  switch (type) {
    case SET_CHATLIST:
      return { ...state, chatList: payload };
    case SET_CURRENT_CHAT:
      return { ...state, current_chat: payload };
    case SET_MESSAGES_LIST:
      return { ...state, messagesList: payload };
    default:
      return state;
  }
};
