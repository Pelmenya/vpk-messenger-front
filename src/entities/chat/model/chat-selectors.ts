import { TAppState } from "@/app/store/store";

export const getSelectedChatId = (state: TAppState) => state.chat.selectedChatId;
