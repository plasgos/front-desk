import { put, call, delay } from "redux-saga/effects";
// import Api from "../../services";
import * as actions from "../actions/actions";
import costs from "../../../dummy/costs.json";

function* watchGetShippingCost(values) {
  yield put(actions.setIsLoadingGetShippingCost(true));
  const { payload } = values;
  console.log("🚀 ~ function*watchGetShippingCost ~ payload:", payload);
  try {
    // const response = yield call(Api.checkcost.multiple, payload);
    // const { data } = response;
    // if (data.success) {
    //   yield put(actions.getShippingCostSuccess(data.data));
    // }

    yield delay(300);
    yield put(actions.getShippingCostSuccess(costs));
  } catch (e) {
    yield put(actions.setIsLoadingGetShippingCost(false));
  } finally {
    yield put(actions.setIsLoadingGetShippingCost(false));
  }
}

export { watchGetShippingCost };
