import { all } from "redux-saga/effects";

import addressesWatcher from "./modules/addresses/watcher";
import ordersWatcher from "./modules/orders/watcher";
import costsWatcher from "./modules/costs/watcher";
import loginWatcher from "./modules/login/watcher";
import warehousesWatcher from "./modules/warehouses/watcher";
import productsWatcher from "./modules/products/watcher";
import packagesWatcher from "./modules/packages/watcher";
import shippingSaga from "./modules/shipping/saga";
import packageSaga from "./modules/package/saga";
import warehouseSaga from "./modules/warehouse/saga";
import productSaga from "./modules/product/saga";

export default function* rootSaga() {
  yield all([
    ...addressesWatcher,
    ...ordersWatcher,
    ...costsWatcher,
    ...loginWatcher,
    ...warehousesWatcher,
    ...productsWatcher,
    ...packagesWatcher,
    all(shippingSaga),
    all(packageSaga),
    all(warehouseSaga),
    all(productSaga)
  ]);
}
