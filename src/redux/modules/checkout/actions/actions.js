import types from "../types";

export const setCheckout = (payload) => ({
  type: types.SET_CHECKCOUT,
  payload,
});
export const setIsLoadingSetCheckout = (payload) => ({
  type: types.IS_LOADING_SET_CHECKCOUT,
  payload,
});

export const getCheckout = (payload) => ({
  type: types.GET_CHECKOUT,
  payload,
});
export const getCheckoutSuccess = (payload) => ({
  type: types.GET_CHECKOUT_SUCCESS,
  payload,
});
export const setIsLoadingGetChekcout = (payload) => ({
  type: types.IS_LOADING_GET_CHECKOUT,
  payload,
});
export const resetCheckout = (payload) => ({
  type: types.RESET_CHECKOUT,
  payload,
});
