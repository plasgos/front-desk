import { takeLatest } from "redux-saga/effects";
import types from "./types";
import { watchGetLogin } from "./actions/saga";

export default [takeLatest(types.LOGIN, watchGetLogin)];
