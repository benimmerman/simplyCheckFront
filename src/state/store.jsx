import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import listSlice from "./listSlice";
import countdownSlice from "./countdownSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "list", "countdown"],
};

const rootReducer = combineReducers({
  user: userSlice,
  list: listSlice,
  countdown: countdownSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const persistor = persistStore(store);

export default persistor;
