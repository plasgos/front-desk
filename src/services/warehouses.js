import { Api } from "./api";

export default {
  getWarehouses: (payload) =>
    Api.get(`/v2/warehouses/seller`, {
      headers: {
        token: payload.token,
      },
    }),
};
