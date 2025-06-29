import { FC, JSX, useState } from "react"
import { useGetChatsQuery } from "../../api/chat-api"
import { useAppSelector } from "@/app/hooks"
import { getToken } from "@/features/auth/model/auth-selectors"
import { getUser } from "@/entities/user/model/user-selectors"
import { ChatList } from "./chat-list/chat-list"
import { Loading } from "@/shared/ui/loading/loading"
import { Modal } from "@/shared/ui/modal/modal"
import { ChatCreateForm } from "../chat-create-form/chat-create-form"
import { EUserType } from "@/entities/user/model/user.entity"
import { ChatAddButton } from "./chat-add-button/chat-add-button"

export const ChatSidebar: FC<{ header?: JSX.Element }> = ({ header }) => {
  const token = useAppSelector(getToken)
  const user = useAppSelector(getUser)
  const [isOpenCreatChatModal, setIsOpenCreatChatModal] = useState(false)

  // Делаем запрос только когда токен есть!
  const {
    data: dataChats,
    refetch: refetchChats,
    isLoading: isLoadingChats,
    isFetching: isFetchingChats,
  } = useGetChatsQuery(token!, {
    skip: !token, // <-- главное исправление!
  })

  // Можно показать лоадинг, если user или token ещё не готовы
  if (!user || !token) {
    return (
      <aside className="min-w-[300px] w-[25%] max-w-[400px] h-full bg-base-200 border-r border-base-300 flex flex-col">
        <div className="relative p-4 pb-16 flex-shrink-0 min-h-[72px] flex justify-between gap-4">
          <Loading
            color="text-primary"
            size="loading-sm"
            type="loading-infinity"
            className="p-4"
          />
        </div>
      </aside>
    )
  }

  return (
    <aside className="min-w-[300px] w-[25%] max-w-[400px] h-full bg-base-200 border-r border-base-300 flex flex-col">
      {/* Шапка */}
      <div className="relative p-4 flex-shrink-0 flex justify-between gap-4">
        <p className="font-semibold">{user?.displayName}</p>
        {header}
      </div>
      {user.userType.typeName === EUserType.Admin && (
        <ChatAddButton onClick={() => setIsOpenCreatChatModal(true)} />
      )}

      {/* Список чатов скроллируемый */}
      <div className="flex-1 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        {isLoadingChats || isFetchingChats ? (
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
      <Modal
        title="Создать чат"
        isOpen={isOpenCreatChatModal}
        handlerClose={() => setIsOpenCreatChatModal(false)}
      >
        <div className="min-w-md">
          <ChatCreateForm
            onSuccess={async () => {
              await refetchChats()
              setIsOpenCreatChatModal(false)
            }}
          />
        </div>
      </Modal>
    </aside>
  )
}
