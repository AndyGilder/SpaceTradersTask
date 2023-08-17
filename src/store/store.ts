import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import agentDetailsReducer from "../slices/agentDetailsSlice";

const combinedReducer = combineReducers({
  user: userReducer,
  agentDetails: agentDetailsReducer,
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
