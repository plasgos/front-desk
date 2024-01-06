import { all } from "redux-saga/effects";

import addressesWatcher from "./modules/addresses/watcher";
import ordersWatcher from "./modules/orders/watcher";

export default function* rootSaga() {
  yield all([...addressesWatcher, ...ordersWatcher]);
}
