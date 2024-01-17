import types from "../types";

export const getProducts = (payload) => ({
  type: types.GET_PRODUCTS,
  payload,
});
export const getProductsSuccess = (payload) => ({
  type: types.GET_PRODUCTS_SUCCESS,
  payload,
});
export const setIsLoadingGetProducts = (payload) => ({
  type: types.IS_LOADING_GET_PRODUCTS,
  payload,
});
export const resetProducts = (payload) => ({
  type: types.RESET_PRODUCTS,
  payload,
});
