import { all } from "redux-saga/effects";

import addressesWatcher from "./modules/addresses/watcher";
import ordersWatcher from "./modules/orders/watcher";
import costsWatcher from "./modules/costs/watcher";
import loginWatcher from "./modules/login/watcher";

export default function* rootSaga() {
  yield all([
    ...addressesWatcher,
    ...ordersWatcher,
    ...costsWatcher,
    ...loginWatcher,
  ]);
}
