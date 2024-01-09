import { takeLatest } from "redux-saga/effects";
import types from "./types";
import { getOrders } from "./actions/saga";

export default [
  takeLatest(types.GET_ORDERS, getOrders),
  //   takeLatest(types.SET_ADDRESSES_STORE, setAddressStore),
];
