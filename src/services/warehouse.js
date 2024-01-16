import { Api } from './api';

export default {
  getByStoreId: payload => Api.get(`/v2/warehouses/buyer/store/${payload.store_id}`, {
    headers: {
      token: payload.token
    }
  }),
};
