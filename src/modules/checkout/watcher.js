import { takeLatest } from "redux-saga/effects";
import types from "./types";
import { getCheckout } from "./actions/saga";

export default [takeLatest(types.GET_CHECKOUT, getCheckout)];
