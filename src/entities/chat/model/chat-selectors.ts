// chat-selectors.ts
import { TAppState } from "@/app/store/store";
import { TMessage } from "./types/t-message";

export const selectMessagesByChatId = (state: TAppState, chatId: number): TMessage[] =>
  state.chat.messages[chatId] || [];

export const getSelectedChatId = (state: TAppState) => state.chat.selectedChatId;
