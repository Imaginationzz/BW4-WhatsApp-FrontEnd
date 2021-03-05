import {
  SET_CHATLIST,
  SET_CURRENT_CHAT,
  SET_MESSAGES_LIST,
  SET_DELETED_CHAT,
} from "./constants";

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
export const setDeletedChat = (deletedChat) => ({
  type: SET_DELETED_CHAT,
  payload: deletedChat,
});
