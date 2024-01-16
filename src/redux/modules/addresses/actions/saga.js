import { put, call } from 'redux-saga/effects';
import Api from '../../../../services';
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

function* watchGetSubdistrict(values) {
  yield put(actions.setIsLoadingGetSubdistrict(true));
  const {payload} = values;
  try {
    const response = yield call(Api.addresses.subdistrict, payload);
    const {data} = response;
    if(data.success){
      yield put(actions.getSubdistrictSuccess(data.data));
    }
  } catch (e) {
    yield put(actions.setIsLoadingGetSubdistrict(false));
  } finally {
    yield put(actions.setIsLoadingGetSubdistrict(false));
  }
}

export { getAddresses, watchGetSubdistrict };
