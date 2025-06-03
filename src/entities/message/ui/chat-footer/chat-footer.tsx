import { formatChatDate } from "@/shared/lib/helpers/format-chat-data"
import { FC } from "react"

type TChatFooterProps = {
  position?: string | null
  createdAt: string
}

export const ChatFooter: FC<TChatFooterProps> = ({ position, createdAt }) => (
  <div className="chat-footer mt-1 flex flex-col items-start gap-0.5">
    {position && <span className="badge badge-xs badge-info w-full">{position}</span>}
    <time className="text-xs opacity-50 w-full text-center">
      {formatChatDate(createdAt)}
    </time>
  </div>
)
