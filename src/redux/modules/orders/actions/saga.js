import { put } from "redux-saga/effects";
import * as actions from "../actions/actions";
import orders from "../../../../dummy/orders.json";

function* getAddressesStore(values) {
  // const {payload} = values;
  yield put(actions.setIsLoadingGetAddressStore(true));
  try {
    // const response = yield call(axios, payload)
    // const {data} = response;
    yield put(actions.getAddressStoreSuccess(orders));
  } catch (e) {
    yield put(actions.setIsLoadingGetAddressStore(false));
  } finally {
    yield put(actions.setIsLoadingGetAddressStore(false));
  }
}

export { getAddressesStore };
