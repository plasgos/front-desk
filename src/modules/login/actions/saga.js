import { put, call } from "redux-saga/effects";
import Api from "../../../services";
import * as actions from "./actions";

function* watchGetLogin(values) {
  const { payload } = values;
  yield put(actions.setIsLoadingLogin(true));
  try {
    let result = {
      user: {},
      token: "",
      logged_in: false,
    };
    const response = yield call(Api.login.account, payload);
    const { data } = response;
    if (data.success) {
      result.user = data;
      result.token = data.token;
      result.logged_in = true;
      yield localStorage.setItem("key_x-log", data.token);
      yield localStorage.setItem(
        "lstlgn",
        JSON.stringify({ nm: data.name, pic: data.avatar_img })
      );
      yield put(actions.getLoginSuccess(result));
    }
  } catch (e) {
    if (e.response) {
      const response = e.response;
      yield put(actions.setMessageLogin(response.data.message));
    }
  } finally {
    yield put(actions.setIsLoadingLogin(false));
  }
}

export { watchGetLogin };
