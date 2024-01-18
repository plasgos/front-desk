import { takeLatest } from "redux-saga/effects";
import types from "./types";
import { watchGetShippingCost } from "./actions/saga";

export default [takeLatest(types.GET_SHIPPING_COST, watchGetShippingCost)];
