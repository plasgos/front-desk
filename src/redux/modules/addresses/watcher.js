import { takeLatest } from "redux-saga/effects";
import types from "./types";
import { getAddresses } from "./actions/saga";

export default [takeLatest(types.GET_ADDRESS, getAddresses)];
