import { FC, JSX } from "react"
import { useGetChatsQuery } from "../../api/chat-api"
import { useAppSelector } from "@/app/hooks"
import { getToken } from "@/features/auth/model/auth-selectors"
import { DataJson } from "@/shared/ui/data-json/data-json"

export const ChatSidebar: FC<{ header?: JSX.Element }> = ({ header }) => {
  const token = useAppSelector(getToken)
  const { data } = useGetChatsQuery(token || "")

  return (
    <aside className="min-w-[25%] h-full bg-base-200 p-4 border-r-1 border-base-300">
      {header}
      <DataJson data={data}/>
    </aside>
  )
}
