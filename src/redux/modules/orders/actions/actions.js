import types from "../types";

export const getAddressStore = (payload) => ({
  type: types.GET_ADDRESSES_STORE,
  payload,
});
export const getAddressStoreSuccess = (payload) => ({
  type: types.GET_ADDRESSES_STORE_SUCCESS,
  payload,
});
export const setIsLoadingGetAddressStore = (payload) => ({
  type: types.IS_LOADING_GET_ADDRESSES_STORE,
  payload,
});
export const resetOrders = (payload) => ({
  type: types.RESET_ORDERS,
  payload,
});
