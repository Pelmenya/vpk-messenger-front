import { FC, useEffect, useRef } from "react"
import { TMessage } from "@/entities/chat/model/types/t-message"
import { useAppSelector } from "@/app/hooks"
import { getUser } from "@/entities/user/model/user-selectors"
import { IconDownload } from "@tabler/icons-react"
import { ChatUserAvatar } from "../../../chat/ui/chat-user-avatar/chat-user-avatar"
import { ChatHeader } from "../chat-header/chat-header"
import { ChatFooter } from "../chat-footer/chat-footer"
import { setBaseImageUrl } from "@/shared/lib/helpers/set-base-image-url"

type TChatMessagesProps = {
  messages: TMessage[]
}

export const ChatMessages: FC<TChatMessagesProps> = ({ messages }) => {
  const currentUser = useAppSelector(getUser)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Скроллим в самый низ при изменении сообщений
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col gap-4 p-4">
      {messages.map(msg => {
        const isMe = msg?.user && msg.user?.userId === currentUser?.userId
        return (
          <div
            key={msg.messageId}
            className={`chat ${isMe ? "chat-end" : "chat-start"}`}
          >
            <ChatHeader displayName={msg?.user?.displayName} />
            <div className="chat-image">
              <ChatUserAvatar
                displayName={msg?.user?.displayName}
                profileImageUrl={msg?.user?.profileImageUrl}
              />
            </div>

            <ChatFooter
              position={msg?.user?.positionName}
              createdAt={msg.createdAt}
            />
            {msg.messageImageUrl && (
              <img
                src={setBaseImageUrl(msg.messageImageUrl)}
                alt="chat-img"
                className="rounded-lg max-w-xs max-h-[240px] mt-2 border border-base-300"
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
                <span className="truncate max-w-md block">
                  {msg.messageFileName || "Скачать файл"}
                </span>
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
      {/* Этот div будет референсом для прокрутки */}
      <div ref={messagesEndRef} />
    </div>
  )
}
