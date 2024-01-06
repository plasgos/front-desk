import { combineReducers } from "redux";
import addressesReducer from "./modules/addresses/reducer";
import ordersReducer from "./modules/orders/reducer";

const rootReducer = combineReducers({
  addresses: addressesReducer,
  orders: ordersReducer,
});

export default rootReducer;
