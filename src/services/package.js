import { Api } from "./api";

const params = (payload) => {
  return {
    filter: payload.filter, // cod,non-cod
    limit: payload.limit, // number
    page: payload.page, // number
    start: payload.start, // DD-MM-YYYY
    end: payload.end, // DD-MM-YYYY
    invoice: payload.invoice, //string
    sort: payload.sort, // latest, oldest
  };
};
export default {
  get: {
    notification: (payload) =>
      Api.get(`/v2/packages/notification`, {
        headers: {
          token: payload.token,
        },
      }),
    process: {
      new: (payload) =>
        Api.get(`/v2/packages/process/new`, {
          headers: {
            token: payload.token,
          },
          params: params(payload),
        }),
      payment: (payload) =>
        Api.get(`/v2/packages/process/payment`, {
          headers: {
            token: payload.token,
          },
          params: params(payload),
        }),
      receipt: (payload) =>
        Api.get(`/v2/packages/process/payment`, {
          headers: {
            token: payload.token,
          },
          params: params(payload),
        }),
    },
    history: {
      waiting_pickup: (payload) =>
        Api.get(`/v2/packages/history/waiting`, {
          headers: {
            token: payload.token,
          },
          params: params(payload),
        }),
      shipped: (payload) =>
        Api.get(`/v2/packages/history/shipped`, {
          headers: {
            token: payload.token,
          },
          params: params(payload),
        }),
    },
  },

  create: {
    package: (payload) =>
      Api.post(`/v2/packages/create`, payload.data, {
        headers: {
          token: payload.token,
        },
      }),
  },
};
