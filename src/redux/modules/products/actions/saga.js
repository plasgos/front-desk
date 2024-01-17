import { put, call } from "redux-saga/effects";
import Api from "../../../../services";
import * as actions from "../actions/actions";

function* watchGetProducts(values) {
  yield put(actions.setIsLoadingGetProducts(true));
  const { payload } = values;
  try {
    const response = yield call(Api.products.getProducts, payload);
    const { data } = response;
    if (data.success) {
      yield put(actions.getProductsSuccess(data.data));
    }
  } catch (e) {
    yield put(actions.setIsLoadingGetProducts(false));
  } finally {
    yield put(actions.setIsLoadingGetProducts(false));
  }
}

export { watchGetProducts };
