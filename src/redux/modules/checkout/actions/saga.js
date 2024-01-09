import { put } from "redux-saga/effects";
import * as actions from "../actions/actions";
import costs from "../../../../dummy/costs.json";

function* getCheckout(values) {
  // const {payload} = values;
  yield put(actions.setIsLoadingGetChekcout(true));
  try {
    // const response = yield call(axios, payload)
    // const {data} = response;
    yield put(actions.getCheckoutSuccess(costs));
  } catch (e) {
    yield put(actions.setIsLoadingGetChekcout(false));
  } finally {
    yield put(actions.setIsLoadingGetChekcout(false));
  }
}

export { getCheckout };
