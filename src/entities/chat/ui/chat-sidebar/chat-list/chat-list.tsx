import { TChatsResponse } from "@/entities/chat/model/types/t-chats-response"
import { FC } from "react"
import { ChatCard } from "../chat-card/chat-card"
import { ChatDivider } from "../chat-divider/chat-divider"
import { useAppSelector } from "@/app/hooks"
import { getSelectedChatId } from "@/entities/chat/model/chat-selectors"

export const ChatList: FC<{ chats: TChatsResponse }> = ({
  chats,
}) => {

  const currentChatId = useAppSelector(getSelectedChatId);

  return (
    <ul className="flex flex-col w-full">
      {chats.map(chat => (
        <li key={chat.chatId}>
          <ChatDivider />
          <ChatCard chat={chat} isActive={currentChatId === chat.chatId} />
        </li>
      ))}
    </ul>
  )
}
