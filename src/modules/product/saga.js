import { put, call, takeLatest, delay } from "redux-saga/effects";
import Api from "../../services";
import types from "./types";
import * as actions from "./reducer";
import { toast } from "react-toastify";

function* watchGetProducts(values) {
  yield put(actions.setIsLoadingGetProducts(true));
  const { payload } = values;
  try {
    const response = yield call(Api.product.get, payload);
    const { data } = response;
    if (data.success) {
      yield put(actions.getProductsSuccess(data.data));
      yield put(actions.setCountGetProducts(data.count));
    }
  } catch (error) {
    yield put(actions.getProductsSuccess([]));
    yield put(actions.setCountGetProducts(0));
  } finally {
    yield put(actions.setIsLoadingGetProducts(false));
  }
}

const sagas = [takeLatest(types.GET_PRODUCTS, watchGetProducts)];

export default sagas;
