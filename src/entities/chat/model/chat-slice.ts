// chat-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TMessage } from "./types/t-message";

type TChatState = {
  messages: Record<number, TMessage[]>;
  status: "idle" | "connected" | "disconnected" | "error";
};

const initialState: TChatState = {
  messages: {},
  status: "idle",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    receiveHistoryMessages: (state, action: PayloadAction<{ chatId: number; messages: TMessage[] }>) => {
      state.messages[action.payload.chatId] = action.payload.messages;
    },
    receiveMessage: (state, action: PayloadAction<{ chatId: number; message: TMessage }>) => {
      const { chatId, message } = action.payload;
      state.messages[chatId] = state.messages[chatId] || [];
      state.messages[chatId].push(message);
    },
    setConnectionStatus: (state, action: PayloadAction<TChatState["status"]>) => {
      state.status = action.payload;
    },
    clearAllMessages: (state) => {
      state.messages = {};
    }
  }
});

export const {
  receiveHistoryMessages,
  receiveMessage,
  setConnectionStatus,
  clearAllMessages
} = chatSlice.actions;
