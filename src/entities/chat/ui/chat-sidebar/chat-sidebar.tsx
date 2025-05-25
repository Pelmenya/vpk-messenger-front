import { FC, JSX } from "react"
import { useGetChatsQuery } from "../../api/chat-api"
import { useAppSelector } from "@/app/hooks"
import { getToken } from "@/features/auth/model/auth-selectors"
import { getUser } from "@/entities/user/model/user-selectors"
import { ChatList } from "./chat-list/chat-list"
import { Loading } from "@/shared/ui/loading/loading"

export const ChatSidebar: FC<{ header?: JSX.Element }> = ({ header }) => {
  const token = useAppSelector(getToken)
  const user = useAppSelector(getUser)
  const { data: dataChats, isLoading: isLoadingChats } = useGetChatsQuery(
    token || "",
  )

  return (
    <aside className="min-w-[300px] w-[25%] max-w-[400px] h-full bg-base-200 border-r border-base-300 flex flex-col">
      {/* Шапка */}
      <div className="relative p-4 flex-shrink-0 min-h-[72px] flex">
        <p className="font-semibold">{user?.displayName}</p>
        {header}
      </div>
      {/* Список чатов скроллируемый */}
      <div className="flex-1 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        {isLoadingChats ? (
          <Loading
            color="text-primary"
            size="loading-sm"
            type="loading-infinity"
            className="p-8"
          />
        ) : (
          <ChatList chats={dataChats || []} />
        )}
      </div>
    </aside>
  )
}
