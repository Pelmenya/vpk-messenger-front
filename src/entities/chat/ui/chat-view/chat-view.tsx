import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useParams } from "react-router-dom"
import {
  useGetChatByIdQuery,
} from "../../api/chat-api"
import { getToken } from "@/features/auth/model/auth-selectors"
import { FC, useEffect } from "react"
import { ChatDivider } from "../chat-sidebar/chat-divider/chat-divider"
import { ChatMessages } from "../../../message/ui/chat-messages/chat-messages"
import { ChatSendForm } from "../../../message/ui/chat-send-form/chat-send-form"
import { useGetMessagesByChatIdQuery } from "@/entities/message/api/message-api"
import { clearAllMessages, receiveHistoryMessages } from "@/entities/message/model/message-slice"
import { selectMessagesByChatId } from "@/entities/message/model/message-selectors"
import { setSelectedChatId } from "../../model/chat-slice"

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

  // Пишем историю в slice при первой загрузке (или смене чата)
  useEffect(() => {
    if (dataMessages && chatId) {
      dispatch(
        receiveHistoryMessages({
          chatId: Number(chatId),
          messages: dataMessages,
        }),
      )
      dispatch(setSelectedChatId(Number(chatId)));
    }
  }, [dataMessages, chatId, dispatch])

  // Коннектим SignalR и чистим сообщения при размонтировании/смене чата
  useEffect(() => {
    dispatch({ type: "chat/connect" })
    return () => {
      dispatch({ type: "chat/disconnect" })
      dispatch(clearAllMessages()) // <-- очищаем все сообщения!
    }
  }, [dispatch, chatId])

  return (
    <div className="flex flex-col h-full w-full">
      <header className="sticky top-0 w-full px-4 z-10">
        <h2 className="py-4 font-bold text-xl">Чат «{dataChat?.name}»</h2>
        <ChatDivider />
      </header>
      <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        <ChatMessages messages={allMessages} />
      </main>
      <footer className="sticky top-0 w-full px-4 z-10">
        <ChatDivider />
        <ChatSendForm />
      </footer>
    </div>
  )
}
