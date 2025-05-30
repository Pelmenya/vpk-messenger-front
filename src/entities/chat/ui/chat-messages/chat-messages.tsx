import { FC } from "react"
import { TMessage } from "@/entities/chat/model/types/t-message"
import { useAppSelector } from "@/app/hooks"
import { getUser } from "@/entities/user/model/user-selectors"
import { IconDownload } from "@tabler/icons-react"
import { ChatUserAvatar } from "../chat-user-avatar/chat-user-avatar"
import { ChatHeader } from "../chat-header/chat-header"

type TChatMessagesProps = {
  messages: TMessage[]
}

export const ChatMessages: FC<TChatMessagesProps> = ({ messages }) => {
  const currentUser = useAppSelector(getUser)

  return (
    <div className="flex flex-col gap-4 p-4">
      {messages.map(msg => {
        const isMe = msg?.user && msg.user?.userId === currentUser?.userId
        return (
          <div
            key={msg.messageId}
            className={`chat ${isMe ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image">
              <ChatUserAvatar
                displayName={msg?.user?.displayName}
                profileImageUrl={msg?.user?.profileImageUrl}
              />
            </div>
            <ChatHeader
              displayName={msg?.user?.displayName}
              position={msg?.user?.positionName}
              createdAt={msg.createdAt}
            />
            {msg.messageImageUrl && (
              <img
                src={
                  import.meta.env.VITE_BACKEND_BASE_IMAGES_URL +
                  msg.messageImageUrl
                }
                alt="chat-img"
                className="rounded-lg max-w-xs mt-2 border"
                style={{ maxHeight: 240 }}
              />
            )}
            {msg.messageFileUrl && (
              <a
                href={msg.messageFileUrl}
                download={msg.messageFileName || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary flex items-center gap-1 mt-2"
              >
                <IconDownload size={18} />
                {msg.messageFileName || "Скачать файл"}
              </a>
            )}
            {msg.content && (
              <div className="chat-bubble whitespace-pre-line">
                {msg.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
