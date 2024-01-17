import { Api } from "./api";

export default {
  getProducts: (payload) =>
    Api.get("/v2/products/seller", {
      headers: {
        token: payload.token,
      },
      params: {
        limit: payload.limit ? payload.limit : null,
        page: payload.page ? payload.page : null,
        categories: payload.categories ? payload.categories : null,
        showcases: payload.showcases ? payload.showcases : null,
        search: payload.search ? payload.search : null,
        sort: payload.sort ? payload.sort : null,
        filter: payload.filter ? payload.filter : null,
        status: payload.status ? payload.status : null,
      },
    }),
};
