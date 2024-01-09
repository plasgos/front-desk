import { takeLatest } from "redux-saga/effects";
import types from "./types";
import { getCosts } from "./actions/saga";

export default [takeLatest(types.GET_COSTS, getCosts)];
