import { TChatsResponse } from "@/entities/chat/model/types/t-chats-response"
import { FC } from "react"

export const ChatList: FC<{ chats: TChatsResponse }> = ({ chats }) => {
  return (
    <ul className="">
      {chats.map(chat => (
        <li key={chat.chatId}>{chat.name}</li>
      ))}
    </ul>
  )
}
