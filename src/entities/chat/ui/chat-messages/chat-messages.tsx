import { FC } from "react"
import { TMessage } from "@/entities/chat/model/types/t-message"
import { useAppSelector } from "@/app/hooks"
import { getUser } from "@/entities/user/model/user-selectors"
import { IconDownload } from "@tabler/icons-react" // Или используйте другую иконку
import { DataJson } from "@/shared/ui/data-json/data-json"

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
            <div className="chat-image avatar">
              {msg?.user && msg?.user?.profileImageUrl ? (
                <img
                  className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-xl"
                  src={
                    import.meta.env.VITE_BACKEND_BASE_IMAGES_URL +
                    msg.user.profileImageUrl
                  }
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-xl">
                  {msg?.user && msg.user.displayName[0]}
                </div>
              )}
            </div>
            <div className="chat-header flex items-center gap-2">
              <span className="font-semibold">{msg?.user && msg.user.displayName}</span>
              <time className="text-xs opacity-50">
                {new Date(msg.createdAt).toLocaleString()}
              </time>
            </div>
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
