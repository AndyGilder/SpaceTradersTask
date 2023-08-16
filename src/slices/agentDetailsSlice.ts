import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AgentDetailsState {
  agentDetails: {
    agentName: string;
    headquarters: string;
    credits: number;
    startingFaction: string;
  };
}

const initialState: AgentDetailsState = {
  agentDetails: {
    agentName: "",
    headquarters: "",
    credits: 0,
    startingFaction: "",
  },
};

export const agentDetailsSlice = createSlice({
  name: "agentDetails",
  initialState,
  reducers: {
    setAgentDetailsState: (
      state,
      action: PayloadAction<{
        agentName: string;
        headquarters: string;
        credits: number;
        startingFaction: string;
      }>
    ) => {
      state.agentDetails = action.payload;
    },
  },
});

export const { setAgentDetailsState } = agentDetailsSlice.actions;

export default agentDetailsSlice.reducer;
