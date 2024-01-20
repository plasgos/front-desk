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
export const setPickUpOptions = (payload) => ({
  type: types.SET_PICKUP_OPTIONS,
  payload,
});
export const setPaymentMethod = (payload) => ({
  type: types.SET_PAYMENT_METHOD,
  payload,
});

export const getShippingCost = (payload) => ({
  type: types.GET_SHIPPING_COST,
  payload,
});
export const getShippingCostSuccess = (payload) => ({
  type: types.GET_SHIPPING_COST_SUCCESS,
  payload,
});
export const setIsLoadingGetShippingCost = (payload) => ({
  type: types.SET_IS_LOADING_GET_SHIPPING_COST,
  payload,
});
export const reduceProductList = (payload) => ({
  type: types.REDUCE_PRODUCT_LIST,
  payload,
});
