import { takeLatest } from "redux-saga/effects";
import types from "./types";
import { watchGetWarehouses } from "./actions/saga";

export default [takeLatest(types.GET_WAREHOUSES, watchGetWarehouses)];
