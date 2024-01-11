import { all } from "redux-saga/effects";

import addressesWatcher from "./modules/addresses/watcher";
import ordersWatcher from "./modules/orders/watcher";
import costsWatcher from "./modules/costs/watcher";
import checkoutWatcher from "./modules/checkout/watcher";

export default function* rootSaga() {
  yield all([
    ...addressesWatcher,
    ...ordersWatcher,
    ...costsWatcher,
    // ...checkoutWatcher,
  ]);
}
