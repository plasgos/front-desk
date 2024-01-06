import { put } from "redux-saga/effects";
import * as actions from "../actions/actions";
import addresses from "../../../../dummy/addresses.json";

function* getAddresses(values) {
  // const {payload} = values;
  yield put(actions.setIsLoadingGetAddress(true));
  try {
    // const response = yield call(axios, payload)
    // const {data} = response;
    yield put(actions.getAddressSuccess(addresses));
  } catch (e) {
    yield put(actions.setIsLoadingGetAddress(false));
  } finally {
    yield put(actions.setIsLoadingGetAddress(false));
  }
}

export { getAddresses };
