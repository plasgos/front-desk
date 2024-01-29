import types from "../types";

export const setOrigin = (payload) => ({
  type: types.SET_ORIGIN,
  payload,
});
export const setSelectSender = (payload) => ({
  type: types.SET_SELECT_SENDER,
  payload,
});
export const setDestination = (payload) => ({
  type: types.SET_DESTINATION,
  payload,
});
export const setProducts = (payload) => ({
  type: types.SET_PRODUCTS,
  payload,
});
export const setTotalPrice = (payload) => ({
  type: types.SET_TOTAL_PRICE,
  payload,
});
export const setTotalWeightEachProduct = (payload) => ({
  type: types.SET_TOTAL_WEIGHT_EACH_PRODUCT,
  payload,
});
export const changeTotalWeightOrders = (payload) => ({
  type: types.CHANGE_TOTAL_WEIGHT_ORDERS,
  payload,
});
export const setDimension = (payload) => ({
  type: types.SET_DIMENSION,
  payload,
});
export const setNotesPackage = (payload) => ({
  type: types.SET_NOTES,
  payload,
});
export const resetProductTotalWeight = (payload) => ({
  type: types.RESET_PRODUCT_TOTAL_WEIGHT,
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
export const setSelectCourir = (payload) => ({
  type: types.SET_SELECT_COURIR,
  payload,
});
export const setBilledByReceiverBeforeCustomCod = (payload) => ({
  type: types.SET_BILLED_BY_RECEIVER,
  payload,
});
export const resetExpeditions = (payload) => ({
  type: types.RESET_EXPEDITIONS,
  payload,
});
export const setSummary = (payload) => ({
  type: types.SET_SUMMARY,
  payload,
});
export const resetSummary = (payload) => ({
  type: types.RESET_SUMMARY,
  payload,
});
