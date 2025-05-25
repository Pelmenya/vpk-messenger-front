import { FC, JSX } from "react"
import { useGetChatsQuery } from "../../api/chat-api"
import { useAppSelector } from "@/app/hooks"
import { getToken } from "@/features/auth/model/auth-selectors"
import { DataJson } from "@/shared/ui/data-json/data-json"
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
    <aside className="min-w-[25%] h-full bg-base-200 p-4 border-r-1 border-base-300 relative flex flex-col gap-8">
      <p className="absolute top-4 left-4 max-w-[50%]">{user?.displayName}</p>
      {header}
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

      <DataJson data={dataChats} />
    </aside>
  )
}
