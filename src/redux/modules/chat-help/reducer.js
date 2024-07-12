import types from "./types";

const initialState = {
  topic: {
    data: [],
    loading: false,
  },
  chat: {
    data: [],
    loading: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_HELP_TOPIC_SUCCESS:
      return {
        ...state,
        topic: {
          ...state.topic,
          data: action.payload,
        },
      };

    case types.IS_LOADING_GET_HELP_TOPIC:
      return {
        ...state,
        topic: {
          ...state.topic,
          loading: action.payload,
        },
      };

    case types.GET_HELP_CHAT_SUCCESS:
      return {
        ...state,
        chat: {
          ...state.chat,
          data: action.payload,
        },
      };

    case types.IS_LOADING_GET_HELP_CHAT:
      return {
        ...state,
        chat: {
          ...state.chat,
          loading: action.payload,
        },
      };

    default:
      return state;
  }
};

export const getHelpTopic = (payload) => ({
  type: types.GET_HELP_TOPIC,
  payload,
});
export const getHelpTopicSuccess = (payload) => ({
  type: types.GET_HELP_TOPIC_SUCCESS,
  payload,
});
export const isLoadingGetHelpTopic = (payload) => ({
  type: types.IS_LOADING_GET_HELP_TOPIC,
  payload,
});

export const getHelpChat = (payload) => ({
  type: types.GET_HELP_CHAT,
  payload,
});
export const getHelpChatSuccess = (payload) => ({
  type: types.GET_HELP_CHAT_SUCCESS,
  payload,
});

export const isLoadingGetHelpChat = (payload) => ({
  type: types.IS_LOADING_GET_HELP_CHAT,
  payload,
});
