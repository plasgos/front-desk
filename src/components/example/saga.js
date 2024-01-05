import { put, call, takeLatest } from 'redux-saga/effects';
import types from './constant';
import * as actions from './reducer';
import addresses from '../../dummy/addresses.json';

function* watchGetAddress(values){
  const {payload} = values;
  yield put(actions.setIsLoadingGetAddress(true))
  try{
    // const response = yield call(axios, payload)
    // const {data} = response;
    yield put(actions.getAddressSuccess(addresses));
  }catch(e){
    yield put(actions.setIsLoadingGetAddress(false))
  }finally{
    yield put(actions.setIsLoadingGetAddress(false))
  }
}

const saga = [
  takeLatest(types.GET_ADDRESS, watchGetAddress)
]
export default saga;
