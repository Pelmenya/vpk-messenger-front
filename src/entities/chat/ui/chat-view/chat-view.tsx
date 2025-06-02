import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useParams } from "react-router-dom"
import { useGetChatByIdQuery } from "../../api/chat-api"
import { getToken } from "@/features/auth/model/auth-selectors"
import { FC, useEffect } from "react"
import { ChatDivider } from "../chat-sidebar/chat-divider/chat-divider"
import { ChatMessages } from "../../../message/ui/chat-messages/chat-messages"
import { ChatSendForm } from "../../../message/ui/chat-send-form/chat-send-form"
import { useGetMessagesByChatIdQuery } from "@/entities/message/api/message-api"
import {
  clearAllMessages,
  receiveHistoryMessages,
} from "@/entities/message/model/message-slice"
import { selectMessagesByChatId } from "@/entities/message/model/message-selectors"
import { setSelectedChatId } from "../../model/chat-slice"
import { ChatSettings } from "../chat-settings/chat-settings"
import { ChatAvatar } from "../chat-avatar/chat-avatar"

export const ChatView: FC = () => {
  const { chatId } = useParams<{ chatId: string }>()
  const dispatch = useAppDispatch()
  const token = useAppSelector(getToken)

  const { data: dataMessages } = useGetMessagesByChatIdQuery(
    {
      chatId: Number(chatId),
      authKey: String(token),
    },
    { refetchOnMountOrArgChange: !!chatId, skip: !chatId },
  )

  const { data: dataChat } = useGetChatByIdQuery(
    {
      chatId: Number(chatId),
      authKey: String(token),
    },
    { refetchOnMountOrArgChange: !!chatId, skip: !chatId },
  )

  const allMessages = useAppSelector(state =>
    selectMessagesByChatId(state, Number(chatId)),
  )

  // История сообщений
  useEffect(() => {
    if (dataMessages && chatId) {
      dispatch(
        receiveHistoryMessages({
          chatId: Number(chatId),
          messages: dataMessages,
        }),
      )
      dispatch(setSelectedChatId(Number(chatId)))
    }
  }, [dataMessages, chatId, dispatch])

  // SignalR: подключаемся при выборе чата, отключаемся при уходе
  useEffect(() => {
    if (chatId && token) {
      dispatch({ type: "chat/connect", payload: { chatId: Number(chatId) } })
    }
    return () => {
      dispatch({ type: "chat/disconnect" })
      dispatch(clearAllMessages())
      dispatch(setSelectedChatId(null))
    }
  }, [dispatch, chatId, token])

  const handleOnUserConfig = () => {
    alert("Open popup")
  }

  return (
    <div className="flex flex-col h-full w-full">
      <header className="sticky top-0 w-full px-4 z-10 flex items-center justify-between gap-2 bg-base-100 py-4">
        <div className="flex items-center gap-3">
          {/* Аватар */}
          <ChatAvatar name={dataChat?.name} />
          <span className="font-bold text-lg">{dataChat?.name || "Чат"}</span>
        </div>
        <ChatSettings onUserConfig={handleOnUserConfig} />
      </header>
      <ChatDivider />
      <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        <ChatMessages messages={allMessages} />
      </main>
      <footer className="sticky bottom-0 w-full px-4 z-10 bg-base-100">
        <ChatDivider />
        <ChatSendForm />
      </footer>
    </div>
  )
}
