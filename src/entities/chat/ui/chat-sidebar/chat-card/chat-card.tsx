import { TChat } from "@/entities/chat/model/types/t-chat"
import { formatChatDate } from "@/shared/lib/helpers/formatChatData";
import { FC } from "react"

export const ChatCard: FC<{ chat: TChat; isActive: boolean }> = ({
  chat,
  isActive,
}) => {
  return (
    <div className="h-16 w-full py-1 px-4 my-1 flex justify-between gap-2 text-base-content hover:bg-primary transition cursor-pointer">
      <h6 className="text-sm font-semibold line-clamp-1 max-w-[80%]">{chat.name}</h6>
      <p className="text-ex-min text-right max-w-[20%]">{formatChatDate(chat.createdAt)}</p>
    </div>
  )
}
