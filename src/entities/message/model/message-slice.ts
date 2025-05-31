import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TMessage } from "@/entities/chat/model/types/t-message";

type TChatState = {
  messages: Record<number, TMessage[]>;
  status: "idle" | "connected" | "disconnected" | "error";
};

const initialState: TChatState = {
  messages: {},
  status: "idle",
};

export const messageSlice = createSlice({
  name: "message",
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
    clearAllMessages: (state) => {
      state.messages = {};
    },
  }
});

export const {
  receiveHistoryMessages,
  receiveMessage,
  clearAllMessages,
} = messageSlice.actions;
