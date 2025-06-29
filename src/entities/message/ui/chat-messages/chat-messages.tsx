// ChatMessages.tsx
import { FC, useEffect, useRef } from "react";
import { TMessage } from "@/entities/chat/model/types/t-message";
import { useAppSelector } from "@/app/hooks";
import { getUser } from "@/entities/user/model/user-selectors";
import { IconDownload } from "@tabler/icons-react";
import { ChatUserAvatar } from "../../../chat/ui/chat-user-avatar/chat-user-avatar";
import { ChatHeader } from "../chat-header/chat-header";
import { ChatFooter } from "../chat-footer/chat-footer";
import { setBaseImageUrl } from "@/shared/lib/helpers/set-base-image-url";
import { Map } from "@/shared/ui/map/map";
import { extractCoordinates } from "@/shared/lib/helpers/extract-coordinates";
import { YMaps } from "@pbe/react-yandex-maps";

type TChatMessagesProps = {
  messages: TMessage[];
};

export const ChatMessages: FC<TChatMessagesProps> = ({ messages }) => {
  const currentUser = useAppSelector(getUser);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="w-full h-full flex flex-1 items-center justify-center p-8">
        <span className="text-center text-lg">Нет сообщений в чате</span>
      </div>
    );
  }

  return (
    <YMaps query={{ apikey: import.meta.env.VITE_YM_API_KEY }}>
      <div className="flex flex-col gap-4 p-4">
        {messages.map(msg => {
          const isMe = msg?.user && msg.user?.userId === currentUser?.userId;
          const coords = msg.content ? extractCoordinates(msg.content) : null;
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
                isMe={isMe}
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
                  href={setBaseImageUrl(msg.messageFileUrl)}
                  download={setBaseImageUrl(msg.messageFileName || "")}
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
              {coords ? (
                <div className="chat-bubble p-0 overflow-hidden">
                  <Map coordinates={coords} zoom={15} />
                </div>
              ) : (
                msg.content && (
                  <div className="chat-bubble whitespace-pre-line">
                    {msg.content}
                  </div>
                )
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </YMaps>
  );
};
