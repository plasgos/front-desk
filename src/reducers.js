import { combineReducers } from "redux";
import exampleReducer from "./components/example/reducer";

const rootReducer = combineReducers({
  example: exampleReducer,
});

export default rootReducer;
