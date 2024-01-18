import { Api } from "./api";

export default {
  multiple: (payload) =>
    Api.post(`/v2/shipping/check/cost/multiple`, payload.data, {
      headers: {
        "content-type": "application/json",
        token: payload.token,
      },
    }),
};
