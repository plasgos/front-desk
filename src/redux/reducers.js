import { combineReducers } from "redux";
import sidebarReducer from "./modules/sidebar/reducer";
import addressesReducer from "./modules/addresses/reducer";
import ordersReducer from "./modules/orders/reducer";
import costsReducer from "./modules/costs/reducer";
import checkoutReducer from "./modules/checkout/reducer";
import totalPriceReducer from "./modules/total-price/reducer";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  addresses: addressesReducer,
  orders: ordersReducer,
  costs: costsReducer,
  checkout: checkoutReducer,
  totalPrice: totalPriceReducer,
});

export default rootReducer;
