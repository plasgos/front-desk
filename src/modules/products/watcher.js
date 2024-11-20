import { takeLatest } from "redux-saga/effects";
import types from "./types";
import { watchGetProducts } from "./actions/saga";

export default [takeLatest(types.GET_PRODUCTS, watchGetProducts)];
