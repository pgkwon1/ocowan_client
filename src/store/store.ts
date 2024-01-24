import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import githubReducer from "./reducers/github.reducer";
const rootReducer = combineReducers({
  githubReducer,
});
const persistConfig = {
  key:
    typeof process.env.NEXT_PUBLIC_PERSIST_KEY === "string"
      ? process.env.NEXT_PUBLIC_PERSIST_KEY
      : "",
  storage: storage,
  whiteList: ["githubReducer"],
};

const rootPersistReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: rootPersistReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});