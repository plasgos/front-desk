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

export const getSubdistrict = (payload) => ({
  type: types.GET_SUBDISTRICT,
  payload,
});
export const getSubdistrictSuccess = (payload) => ({
  type: types.GET_SUBDISTRICT_SUCCESS,
  payload,
});
export const setIsLoadingGetSubdistrict = (payload) => ({
  type: types.IS_LOADING_GET_SUBDISTRICT,
  payload,
});
export const resetSubdistrict = (payload) => ({
  type: types.RESET_SUBDISTRICT,
  payload,
});
