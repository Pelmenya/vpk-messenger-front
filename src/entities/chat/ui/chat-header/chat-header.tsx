import { FC } from "react"

type TChatHeaderProps = {
  displayName: string
  position?: string | null
  createdAt: string
}

export const ChatHeader: FC<TChatHeaderProps> = ({
  displayName,
  position,
  createdAt,
}) => (
  <div className="chat-header flex flex-col items-start gap-0.5">
    <span className="font-semibold">{displayName}</span>
    {position && (
        <span className="badge badge-info text-xs">{position}</span>
    )}
    <time className="text-xs opacity-50">
      {new Date(createdAt).toLocaleString()}
    </time>
  </div>
)
