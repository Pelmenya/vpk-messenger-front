import { FC } from "react"

type TChatFooterProps = {
  position?: string | null
  createdAt: string
}

export const ChatFooter: FC<TChatFooterProps> = ({ position, createdAt }) => (
  <div className="chat-footer mt-1 flex flex-col items-start gap-0.5">
    {position && <span className="badge badge-xs badge-info">{position}</span>}
    <time className="text-xs opacity-50">
      {new Date(createdAt).toLocaleString()}
    </time>
  </div>
)
