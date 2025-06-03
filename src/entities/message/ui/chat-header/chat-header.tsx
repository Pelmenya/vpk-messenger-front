import { FC } from "react"

type TChatHeaderProps = {
  displayName: string
}

export const ChatHeader: FC<TChatHeaderProps> = ({ displayName }) => (
  <div className="chat-header flex flex-col items-center gap-0.5">
    <span className="font-semibold">{displayName}</span>
  </div>
)
