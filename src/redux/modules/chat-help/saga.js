import { put, call, takeLatest } from "redux-saga/effects";
import Api from "../../../services";
import types from "./types";
import * as actions from "./reducer";

function* watchGetHelpTopic(value) {
  yield put(actions.isLoadingGetHelpTopic(true));
  const { payload } = value;
  try {
    const response = yield call(Api.help.get.topic, payload);
    const { data } = response;
    if (data.success) {
      yield put(actions.getHelpTopicSuccess(data.data));
    }
  } catch (e) {
    yield put(actions.isLoadingGetHelpTopic(false));
  } finally {
    yield put(actions.isLoadingGetHelpTopic(false));
  }
}

function* watchGetHelpChat(value) {
  yield put(actions.isLoadingGetHelpChat(true));
  const { payload } = value;
  try {
    const response = yield call(Api.help.get.chat, payload);
    const { data } = response;
    if (data.success) {
      yield put(actions.getHelpChatSuccess(data.data));
    }
  } catch (e) {
    yield put(actions.isLoadingGetHelpChat(false));
  } finally {
    yield put(actions.isLoadingGetHelpChat(false));
  }
}

function* watchCreateHelpChat(value) {
  yield put(actions.isLoadingCreateHelpChat(true));
  const { payload } = value;
  try {
    const response = yield call(Api.help.create.new_chat, payload);
    const { data } = response;
    if (data.success) {
      yield put(actions.createHelpChatSuccess(data.data));
    }
  } catch (e) {
    yield put(actions.isLoadingCreateHelpChat(false));
  } finally {
    yield put(actions.isLoadingCreateHelpChat(false));
  }
}

function* watchReplyHelpChat(value) {
  yield put(actions.isLoadingReplyHelpChat(true));
  const { payload } = value;
  console.log("🚀 ~ function*watchReplyHelpChat ~ payload:", payload);
  try {
    const response = yield call(Api.help.create.reply_chat, payload);
    const { data } = response;
    if (data.success) {
      yield put(actions.replyHelpChatSuccess(data.data));
    }
  } catch (e) {
    yield put(actions.isLoadingReplyHelpChat(false));
  } finally {
    yield put(actions.isLoadingReplyHelpChat(false));
  }
}

const sagas = [
  takeLatest(types.GET_HELP_TOPIC, watchGetHelpTopic),
  takeLatest(types.GET_HELP_CHAT, watchGetHelpChat),
  takeLatest(types.CREATE_HELP_CHAT, watchCreateHelpChat),
  takeLatest(types.REPLY_HELP_CHAT, watchReplyHelpChat),
];

export default sagas;
