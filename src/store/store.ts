import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import agentDetailsReducer from "../slices/agentDetailsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    agentDetails: agentDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
