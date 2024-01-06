import { all } from "redux-saga/effects";

import addressesWatcher from "./modules/addresses/watcher";

export default function* rootSaga() {
  yield all([...addressesWatcher]);
}
