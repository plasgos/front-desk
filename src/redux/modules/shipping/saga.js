import { put, call, takeLatest, delay } from "redux-saga/effects";
import Api from "../../../services";
import types from "./types";
import * as actions from "./reducer";

function* watchCheckCosts(value) {
  yield put(actions.setIsLoadingCheckCosts(true));
  const { payload } = value;
  console.log("🚀 ~ function*watchCheckCosts ~ payload:", payload);
  try {
    const response = yield call(Api.checkcost.multiple, payload);
    const { data } = response;
    if (data.success) {
      yield put(actions.checkCostsSuccess(data.data));
    }
  } catch (e) {
    yield put(actions.setIsLoadingCheckCosts(false));
  } finally {
    yield put(actions.setIsLoadingCheckCosts(false));
  }
}
const sagas = [takeLatest(types.CHECK_COSTS, watchCheckCosts)];

export default sagas;
