// chat-selectors.ts
import { TAppState } from "@/app/store/store";
import { TMessage } from "./types/t-message";

export const getSelectedChatId = (state: TAppState) => state.chat.selectedChatId;
