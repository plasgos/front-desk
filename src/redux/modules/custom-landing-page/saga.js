import { put, call, takeLatest } from "redux-saga/effects";
import Api from "../../../services";
import types from "./types";
import * as actions from "./reducer";

function* watchGetHistoryWaitingPickup(value) {
  yield put(actions.setIsLoadingGetHistorySuccess(true));
  const { payload } = value;
  try {
    const response = yield call(
      Api.packages.get.history.waiting_pickup,
      payload
    );
    const { data } = response;
    if (data.success) {
      yield put(actions.getHistorySuccess(data.data));
    }
  } catch (e) {
    yield put(actions.setIsLoadingGetHistorySuccess(false));
  } finally {
    yield put(actions.setIsLoadingGetHistorySuccess(false));
  }
}

function* watchGetHistoryShipped(value) {
  yield put(actions.setIsLoadingGetHistorySuccess(true));
  const { payload } = value;
  try {
    const response = yield call(Api.packages.get.history.shipped, payload);
    const { data } = response;
    if (data.success) {
      yield put(actions.getHistorySuccess(data.data));
    }
  } catch (e) {
    yield put(actions.setIsLoadingGetHistorySuccess(false));
  } finally {
    yield put(actions.setIsLoadingGetHistorySuccess(false));
  }
}
const sagas = [
  takeLatest(types.GET_HISTORY_WAITING_PICKUP, watchGetHistoryWaitingPickup),
  takeLatest(types.GET_HISTORY_SHIPPED, watchGetHistoryShipped),
];

export default sagas;
