import { put, call, takeLatest } from 'redux-saga/effects';
import Api from '../../../services';
import types from './types';
import * as actions from './reducer';

function* watchGetWarehouses(value){
  yield put(actions.setLoadingGetWarehouses(true));
  const { payload } = value;
  try{
    const response = yield call(Api.warehouses.get, payload);
    const { data } = response;
    if (data.success) {
      yield put(actions.getWarehousesSuccess(data.data));
    }
  }catch(e){
    yield put(actions.setLoadingGetWarehouses(false));
  }finally{
    yield put(actions.setLoadingGetWarehouses(false));
  }
}

const sagas = [
  takeLatest(types.GET_WAREHOUSES, watchGetWarehouses),
]

export default sagas;
