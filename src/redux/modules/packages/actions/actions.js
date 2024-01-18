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
