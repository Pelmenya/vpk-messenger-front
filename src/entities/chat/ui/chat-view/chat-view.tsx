import { useAppSelector } from "@/app/hooks"
import { getToken } from "@/features/auth/model/auth-selectors"
import { FC } from "react"
import { useParams } from "react-router-dom"
import { useGetMessagesByChatIdQuery } from "../../api/chat-api"
import { DataJson } from "@/shared/ui/data-json/data-json"
import { ChatDivider } from "../chat-sidebar/chat-divider/chat-divider"

export const ChatView: FC = () => {
  const { chatId } = useParams<{ chatId: string }>()
  const token = useAppSelector(getToken)
  const { data: dataMessages } = useGetMessagesByChatIdQuery(
    {
      chatId: Number(chatId),
      authKey: String(token),
    },
    { refetchOnMountOrArgChange: !!chatId, skip: !chatId },
  )

  return (
    <div className="flex flex-col h-full w-full">
      <header className="sticky top-0 w-full px-4 z-10">
        <p className="py-4">{chatId}</p>
        <ChatDivider />
      </header>
      <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        <DataJson data={dataMessages} />
      </main>
      <footer className="sticky top-0 w-full px-4 z-10">
        <ChatDivider />
        <p className="py-4">{chatId}</p>
      </footer>
    </div>
  )
}
