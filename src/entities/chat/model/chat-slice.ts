// chat-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TMessage } from "./types/t-message";
import { TNullable } from "@/shared/types/t-nullable";

type TChatState = {
  messages: Record<number, TMessage[]>;
  status: "idle" | "connected" | "disconnected" | "error";
  selectedChatId: TNullable<number>;
};

const initialState: TChatState = {
  messages: {},
  status: "idle",
  selectedChatId: null,
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
    },
    setSelectedChatId: (state, action: PayloadAction<number>) => {
      state.selectedChatId = action.payload;
    }
  }
});

export const {
  receiveHistoryMessages,
  receiveMessage,
  setConnectionStatus,
  clearAllMessages,
  setSelectedChatId,
} = chatSlice.actions;
