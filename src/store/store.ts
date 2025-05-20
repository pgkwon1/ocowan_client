import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/users.reducer";
import ocowanReducer from "./reducers/ocowan.reducer";
import bigthreeReducer from "./reducers/bigthree.reducer";
const rootReducer = combineReducers({
  usersReducer,
  ocowanReducer,
  bigthreeReducer,
});
const persistConfig = {
  key:
    typeof process.env.NEXT_PUBLIC_PERSIST_KEY === "string"
      ? process.env.NEXT_PUBLIC_PERSIST_KEY
      : "",
  storage: storage,
  whitelist: ["usersReducer", "ocowanReducer", "bigthreeReducer"],
};

export const serverStore = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const clientStore = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
