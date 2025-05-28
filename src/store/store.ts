import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersReducer from "./reducers/users.reducer";
import bigthreeReducer from "./reducers/bigthree.reducer";
import ocowanReducer from "./reducers/ocowan.reducer";

const rootReducer = combineReducers({
  usersReducer,
  bigthreeReducer,
});

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    // 서버 상태와 클라이언트 상태를 깊은 병합
    return {
      ...state,
      ...action.payload,
      usersReducer: { ...state.usersReducer, ...action.payload.usersReducer },
      bigthreeReducer: {
        ...state.bigthreeReducer,
        ...action.payload.bigthreeReducer,
      },
      ocowanReducer: {
        ...state.ocowanReducer,
        ...action.payload.ocowanReducer,
      },
    };
  }
  return rootReducer(state, action);
};

const persistConfig = {
  key: process.env.NEXT_PUBLIC_PERSIST_KEY ?? "default-persist",
  storage,
  whitelist: ["usersReducer", "bigthreeReducer", "ocowanReducer"],
};
const makeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    // 서버: persist 미적용
    return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
  } else {
    // 클라이언트: persist 적용
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    });
    (store as any).__persistor = persistStore(store);
    return store;
  }
};

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});
