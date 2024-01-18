import types from "../types";

export const setOrigin = (payload) => ({
  type: types.SET_ORIGIN,
  payload,
});
export const setDestination = (payload) => ({
  type: types.SET_DESTINATION,
  payload,
});
export const setWeightAndPrice = (payload) => ({
  type: types.SET_WEIGHT_AND_PRICE,
  payload,
});
export const setOrders = (payload) => ({
  type: types.SET_ORDERS,
  payload,
});

export const getShippingCost = (payload) => ({
  type: types.GET_SHIPPING_COST,
  payload,
});
export const isLoadingGetShippingCost = (payload) => ({
  type: types.IS_LOADING_GET_SHIPPING_COST,
  payload,
});
