import {
  combineSlices,
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  type PersistConfig,
} from "redux-persist";

import { apiSlice } from "./api";
import { fileApiSlice } from "./api/files-api/fetch-file-api";
import { authSlice } from "./features/auth";
import { dashboardSlice } from "./features/dashboard";
import storage from "./storage";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(
  dashboardSlice,
  authSlice,
  apiSlice,
  fileApiSlice,
);
export type TRootState = ReturnType<typeof rootReducer>;
type TPersistorConfig = Omit<
  PersistConfig<TRootState, unknown, unknown, unknown>,
  "blacklist" | "whitelist"
> & {
  blacklist: Array<keyof TRootState>;
  whitelist: Array<keyof TRootState>;
};
const persistConfig: TPersistorConfig = {
  key: "root",
  storage,
  blacklist: ["apiSlice", "fileApiSlice"],
  whitelist: ["authSlice"],
};
const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistedRootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
            "fileApiSlice/executeQuery/fulfilled",
            "fileApiSlice/executeQuery/pending",
            "fileApiSlice/executeQuery/rejected",
          ],
          ignoredPaths: ["fileApiSlice"],
        },
      })
        .concat(apiSlice.middleware)
        .concat(fileApiSlice.middleware),

    devTools: process.env.NODE_ENV !== "production",
  });

// Infer the return type of `makeStore`
export type TAppStore = ReturnType<typeof makeStore>;
// Infer the `TAppDispatch` type from the store itself
export type TAppDispatch = TAppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  TRootState,
  unknown,
  Action
>;
