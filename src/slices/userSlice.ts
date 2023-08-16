import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    token: string;
    agentName: string;
  };
}

const initialState: UserState = {
  user: {
    token: "",
    agentName: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (
      state,
      action: PayloadAction<{ token: string; agentName: string }>
    ) => {
      state.user = action.payload;
    },
  },
});

export const { setUserState } = userSlice.actions;

export default userSlice.reducer;
