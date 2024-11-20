import { put, call } from "redux-saga/effects";
import Api from "../../../services";
import * as actions from "../actions/actions";
// import warehouses from "../../../dummy/warehouses.json";

function* watchGetWarehouses(values) {
  yield put(actions.setIsLoadingGetWarehouses(true));
  const { payload } = values;
  try {
    const response = yield call(Api.warehouses.getWarehouses, payload);
    const { data } = response;
    if (data.success) {
      yield put(actions.getWarehousesSuccess(data.data));
    }

    // yield put(actions.getWarehousesSuccess(warehouses));
  } catch (e) {
    yield put(actions.setIsLoadingGetWarehouses(false));
  } finally {
    yield put(actions.setIsLoadingGetWarehouses(false));
  }
}

export { watchGetWarehouses };
