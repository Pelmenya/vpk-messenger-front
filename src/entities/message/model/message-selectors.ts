import { TAppState } from "@/app/store/store";
import { TMessage } from "@/entities/chat/model/types/t-message";

export const selectMessagesByChatId = (state: TAppState, chatId: number): TMessage[] =>
    state.message.messages[chatId] || [];
