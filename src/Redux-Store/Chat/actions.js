import { SET_CHATLIST, SET_CURRENT_CHAT, SET_MESSAGES_LIST } from "./constants";

export const setChatList = (chatList) => ({
  type: SET_CHATLIST,
  payload: chatList,
});
export const setChat = (chat) => ({
  type: SET_CURRENT_CHAT,
  payload: chat,
});
export const setMessagesList = (messagesList) => ({
  type: SET_MESSAGES_LIST,
  payload: messagesList,
});
