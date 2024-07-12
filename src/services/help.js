import { Api } from "./api";

export default {
  get: {
    topic: (payload) =>
      Api.get("/v2/help/topic", {
        headers: {
          token: payload.token,
        },
      }),
    chat: (payload) =>
      Api.get(`/v2/help/chat/${payload.topic_id}`, {
        headers: {
          token: payload.token,
        },
      }),
    notification: (payload) =>
      Api.get(`/v2/help/notification`, {
        headers: {
          token: payload.token,
        },
      }),
  },
  create: {
    center: (payload) => Api.post("/v2/help/center", payload),
    new_chat: (payload) =>
      Api.post(
        "/v2/help/chat",
        {
          topic: {
            title: payload.topic.title,
            category: payload.topic.category,
          },
          message: payload.message,
        },
        {
          headers: {
            token: payload.token,
          },
        }
      ),
    reply_chat: (payload) =>
      Api.post(
        `/v2/help/reply/chat/topic/${payload.topic_id}`,
        {
          message: payload.message,
        },
        {
          headers: {
            token: payload.token,
          },
        }
      ),
  },
  update: {
    read: (payload) =>
      Api.put(
        `/v2/help/is-read/${payload.topic_id}`,
        {},
        {
          headers: {
            token: payload.token,
          },
        }
      ),
  },
  contactUs: (payload) => Api.post("/v1/help-center", payload),
  getHelpTopic: (payload) =>
    Api.get("/v2/help/topic", {
      headers: {
        token: payload.token,
      },
    }),
  getHelpChatTalk: (payload) =>
    Api.get(`/v2/help/chat/${payload.topic_id}`, {
      headers: {
        token: payload.token,
      },
    }),
  getHelpChatTalks: (payload) =>
    Api.get(`/v2/help/chat-talk`, {
      headers: {
        token: payload.token,
      },
    }),
  createNewChatTalk: (payload) =>
    Api.post(`/v2/help/chat`, payload, {
      headers: {
        token: payload.token,
      },
    }),
  createReplyChatTalk: (payload) =>
    Api.post(`/v2/help/chat/reply/${payload.topic_id}`, payload, {
      headers: {
        token: payload.token,
      },
    }),
  updateIsRead: (payload) =>
    Api.put(`/v2/help/is-read/${payload.topic_id}`, payload, {
      headers: {
        token: payload.token,
      },
    }),
};
