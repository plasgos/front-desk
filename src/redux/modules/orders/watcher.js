import { takeLatest } from "redux-saga/effects";
import types from "./types";
import { getAddressesStore } from "./actions/saga";

export default [takeLatest(types.GET_ADDRESSES_STORE, getAddressesStore)];
