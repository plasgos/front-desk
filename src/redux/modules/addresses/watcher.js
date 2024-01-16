import { takeLatest } from "redux-saga/effects";
import types from "./types";
import { getAddresses, watchGetSubdistrict } from "./actions/saga";

export default [
  takeLatest(types.GET_ADDRESS, getAddresses),
  takeLatest(types.GET_SUBDISTRICT, watchGetSubdistrict),
];
