import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createCompressor from "redux-persist-transform-compress";
import { encryptTransform } from "redux-persist-transform-encrypt";

import rootSaga from "./sagas";
import rootReducers from "./reducers";

const encryptor = encryptTransform({ secretKey: "secretkey" });
const compressor = createCompressor({});
const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  transforms: [encryptor],
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducers);
export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);
export const persistor = persistStore(store, { transform: [compressor] });

sagaMiddleware.run(rootSaga);
