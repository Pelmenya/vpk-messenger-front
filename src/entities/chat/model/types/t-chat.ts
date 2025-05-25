import { TParticipant } from "./t-participant";

export type TChat = {
  chatId: number;
  name: string;
  isGroup: boolean;
  createdAt: string; // ISO-строка даты
  participants: TParticipant[];
};
