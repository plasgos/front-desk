import types from "../types";

export const getAddressStore = (payload) => ({
  type: types.GET_ADDRESSES_STORE,
  payload,
});
export const setAddressStore = (payload) => ({
  type: types.SET_ADDRESSES_STORE,
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

export const getOrders = (payload) => ({
  type: types.GET_ORDERS,
  payload,
});
export const getOrdersSuccess = (payload) => ({
  type: types.GET_ORDERS_SUCCESS,
  payload,
});
export const setIsLoadingGetOrders = (payload) => ({
  type: types.IS_LOADING_GET_ORDERS,
  payload,
});
