import { put, call } from "redux-saga/effects";
import Api from "../../../../services";
import * as actions from "../actions/actions";

function* watchGetShippingCost(values) {
  yield put(actions.setIsLoadingGetShippingCost(true));
  const { payload } = values;
  try {
    const response = yield call(Api.checkcost.multiple, payload);
    const { data } = response;
    if (data.success) {
      yield put(actions.getShippingCostSuccess(data.data));
    }
  } catch (e) {
    yield put(actions.setIsLoadingGetShippingCost(false));
  } finally {
    yield put(actions.setIsLoadingGetShippingCost(false));
  }
}

export { watchGetShippingCost };
