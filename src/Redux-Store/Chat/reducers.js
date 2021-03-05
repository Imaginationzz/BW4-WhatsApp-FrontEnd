import {
  SET_CHATLIST,
  SET_CURRENT_CHAT,
  SET_MESSAGES_LIST,
  SET_DELETED_CHAT,
  REMOVE_DELETED_CHAT,
} from "./constants";

const chatState = {
  chatList: [],
  current_chat: null,
  messagesList: [],
  deletedChat: [],
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
    case SET_DELETED_CHAT:
      return {
        ...state,
        deletedChat: state.deletedChat.concat(payload),
      };
    case REMOVE_DELETED_CHAT:
      return {
        ...state,
        deletedChat: state.deletedChat.filter((chat) => chat !== payload),
      };
    default:
      return state;
  }
};
