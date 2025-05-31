import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TNullable } from "@/shared/types/t-nullable";

type TChatState = {
  status: "idle" | "connected" | "disconnected" | "error";
  selectedChatId: TNullable<number>;
};

const initialState: TChatState = {
  status: "idle",
  selectedChatId: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConnectionStatus: (state, action: PayloadAction<TChatState["status"]>) => {
      state.status = action.payload;
    },
    setSelectedChatId: (state, action: PayloadAction<number>) => {
      state.selectedChatId = action.payload;
    }
  }
});

export const {
  setConnectionStatus,
  setSelectedChatId,
} = chatSlice.actions;
