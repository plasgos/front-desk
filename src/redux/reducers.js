import { combineReducers } from "redux";
import sidebarReducer from "./modules/sidebar/reducer";
import addressesReducer from "./modules/addresses/reducer";
import ordersReducer from "./modules/orders/reducer";
import costsReducer from "./modules/costs/reducer";
import checkoutReducer from "./modules/checkout/reducer";
import totalPriceReducer from "./modules/total-price/reducer";
import loginReducer from "./modules/login/reducer";
import warehousesReducer from "./modules/warehouses/reducer";
import productsReducer from "./modules/products/reducer";
import packagesReducer from "./modules/packages/reducer";

const rootReducer = combineReducers({
  login: loginReducer,
  sidebar: sidebarReducer,
  addresses: addressesReducer,
  orders: ordersReducer,
  costs: costsReducer,
  checkout: checkoutReducer,
  totalPrice: totalPriceReducer,
  warehouses: warehousesReducer,
  products: productsReducer,
  packages: packagesReducer,
});

export default rootReducer;
