import { formatChatDate } from "@/shared/lib/helpers/format-chat-data"
import { FC } from "react"

type TChatFooterProps = {
  position?: string | null
  createdAt: string
  isMe?: boolean
}

export const ChatFooter: FC<TChatFooterProps> = ({
  position,
  createdAt,
  isMe,
}) => (
  <div
    className={`chat-footer mt-1 flex flex-col gap-0.5 ${isMe ? "items-end" : "items-start"}`}
  >
    {position && <span className="badge badge-xs badge-info">{position}</span>}
    <time className="text-xs opacity-50">{formatChatDate(createdAt)}</time>
  </div>
)
