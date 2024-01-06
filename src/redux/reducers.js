import { combineReducers } from "redux";
import addressesReducer from "./modules/addresses/reducer";

const rootReducer = combineReducers({
  addresses: addressesReducer,
});

export default rootReducer;
