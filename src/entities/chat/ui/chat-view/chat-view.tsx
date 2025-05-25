import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useParams } from "react-router-dom"
import { useGetMessagesByChatIdQuery } from "../../api/chat-api"
import { getToken } from "@/features/auth/model/auth-selectors"
import { receiveHistoryMessages, clearMessages, clearAllMessages } from "../../model/chat-slice"
import { selectMessagesByChatId } from "../../model/chat-selectors"
import { FC, useEffect } from "react"
import { ChatDivider } from "../chat-sidebar/chat-divider/chat-divider"
import { DataJson } from "@/shared/ui/data-json/data-json"

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
        <p className="py-4">{chatId}</p>
        <ChatDivider />
      </header>
      <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        <DataJson data={allMessages} />
      </main>
      <footer className="sticky top-0 w-full px-4 z-10">
        <ChatDivider />
        <p className="py-4">{chatId}</p>
      </footer>
    </div>
  )
}
