import types from "../types";

export const getWarehouses = (payload) => ({
  type: types.GET_WAREHOUSES,
  payload,
});
export const getWarehousesSuccess = (payload) => ({
  type: types.GET_WAREHOUSES_SUCCESS,
  payload,
});
export const setIsLoadingGetWarehouses = (payload) => ({
  type: types.IS_LOADING_GET_WAREHOUSES,
  payload,
});
export const resetWarehouses = (payload) => ({
  type: types.RESET_WAREHOUSES,
  payload,
});
