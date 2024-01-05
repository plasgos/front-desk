import { all } from "redux-saga/effects";
import exampleSaga from "./components/example/saga";

export default function* rootSaga() {
  yield all([all(exampleSaga)]);
}
