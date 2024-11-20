import { put } from "redux-saga/effects";
import * as actions from "../actions/actions";
import orders from "../../../dummy/orders.json";

function* getOrders(values) {
  // const {payload} = values;
  yield put(actions.setIsLoadingGetOrders(true));
  try {
    // const response = yield call(axios, payload)
    // const {data} = response;
    yield put(actions.getOrdersSuccess(orders));
  } catch (e) {
    yield put(actions.setIsLoadingGetOrders(false));
  } finally {
    yield put(actions.setIsLoadingGetOrders(false));
  }
}

export { getOrders };
