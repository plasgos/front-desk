import { combineReducers } from "redux";
import sidebarReducer from "../modules/sidebar/reducer";
import addressesReducer from "../modules/addresses/reducer";
import ordersReducer from "../modules/orders/reducer";
import costsReducer from "../modules/costs/reducer";
import checkoutReducer from "../modules/checkout/reducer";
import totalPriceReducer from "../modules/total-price/reducer";
import loginReducer from "../modules/login/reducer";
import warehousesReducer from "../modules/warehouses/reducer";
import productsReducer from "../modules/products/reducer";
import packagesReducer from "../modules/packages/reducer";
import shippingReducer from "../modules/shipping/reducer";
import warehouseReducer from "../modules/warehouse/reducer";
import packageReducer from "../modules/package/reducer";
import productReducer from "../modules/product/reducer";
import chatHelpReducer from "../modules/chat-help/reducer";
import customLandingPageReducer from "../modules/custom-landing-page/reducer";

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
  shipping: shippingReducer,
  package: packageReducer,
  warehouse: warehouseReducer,
  product: productReducer,
  chatHelp: chatHelpReducer,
  customLandingPage: customLandingPageReducer,
});

export default rootReducer;
