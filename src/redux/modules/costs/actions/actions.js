import types from "../types";

export const getCosts = (payload) => ({
  type: types.GET_COSTS,
  payload,
});
export const getCostSuccess = (payload) => ({
  type: types.GET_COSTS_SUCCESS,
  payload,
});
export const setIsLoadingGetCost = (payload) => ({
  type: types.IS_LOADING_GET_COSTS,
  payload,
});
export const resetAddress = (payload) => ({
  type: types.RESET_COSTS,
  payload,
});
