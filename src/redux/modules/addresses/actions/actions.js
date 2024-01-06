import types from "../types";

export const getAddress = (payload) => ({
  type: types.GET_ADDRESS,
  payload,
});
export const getAddressSuccess = (payload) => ({
  type: types.GET_ADDRESS_SUCCESS,
  payload,
});
export const setIsLoadingGetAddress = (payload) => ({
  type: types.IS_LOADING_GET_ADDRESS,
  payload,
});
export const resetAddress = (payload) => ({
  type: types.RESET_ADDRESS,
  payload,
});
