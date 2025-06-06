import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useParams } from "react-router-dom"
import { useGetChatByIdQuery, usePutChatByIdMutation } from "../../api/chat-api"
import { getToken } from "@/features/auth/model/auth-selectors"
import { FC, useEffect, useState } from "react"
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
import { Modal } from "@/shared/ui/modal/modal"
import { useGetOtherUsersQuery } from "@/entities/user/api/user-api"
import { ChatUsersSelect } from "../chat-users-select/chat-users-select"
import { getUser } from "@/entities/user/model/user-selectors"
import { EUserType } from "@/entities/user/model/user.entity"
import { toast } from "react-toastify"

export const ChatView: FC = () => {
  const { chatId } = useParams<{ chatId: string }>()
  const dispatch = useAppDispatch()
  const token = useAppSelector(getToken)
  const user = useAppSelector(getUser)

  const [isOpenUserModal, setIsOpenUserModal] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const { data: dataMessages, refetch: refetchMessages } = useGetMessagesByChatIdQuery(
    {
      chatId: Number(chatId),
      authKey: String(token),
    },
    { refetchOnMountOrArgChange: !!chatId, skip: !chatId },
  )

  const {
    data: dataChat,
    refetch: refetchChats,
    isLoading: isLoadingChat,
  } = useGetChatByIdQuery(
    { chatId: Number(chatId), authKey: String(token) },
    { refetchOnMountOrArgChange: !!chatId, skip: !chatId },
  )
  const {
    data: dataUsers,
    refetch: refetchUsers,
    isLoading: isLoadingUsers,
  } = useGetOtherUsersQuery(
    { authKey: String(token) },
    { refetchOnMountOrArgChange: !!chatId, skip: !chatId },
  )

  const allMessages = useAppSelector(state =>
    selectMessagesByChatId(state, Number(chatId)),
  )

  const [putChatById, { isLoading: isSaving }] = usePutChatByIdMutation()

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
    setIsOpenUserModal(true)
    setSaveError(null)
  }

  const handleSaveParticipants = async (userIds: number[]) => {
    try {
      setSaveError(null)
      await putChatById({
        chatId: Number(chatId),
        name: dataChat?.name || '',
        participants: [...userIds.map(userId => userId), user?.userId || 0],
        authKey: String(token),
      }).unwrap()
      await refetchUsers()
      await refetchChats()
      await refetchMessages()
      setIsOpenUserModal(false)
      toast.success("Участники чата сохранены!") // уведомление об успехе
    } catch (e: any) {
      setSaveError("Ошибка при сохранении участников!")
      toast.error(e?.data?.message || "Ошибка при сохранении участников!") // уведомление об ошибке
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
      <header className="sticky top-0 w-full px-4 z-10 flex items-center justify-between gap-2 bg-base-100 py-4">
        <div className="flex items-center gap-3">
          <ChatAvatar name={dataChat?.name} />
          <span className="font-bold text-lg">{dataChat?.name || "Чат"}</span>
        </div>
        {user?.userType.typeName === EUserType.Admin && (
          <ChatSettings onUserConfig={handleOnUserConfig} />
        )}
      </header>
      <ChatDivider />
      <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        <ChatMessages messages={allMessages} />
      </main>
      <footer className="sticky bottom-0 w-full px-4 z-10 bg-base-100">
        <ChatDivider />
        <ChatSendForm />
      </footer>
      <Modal
        title="Выберите участников чата"
        isOpen={isOpenUserModal}
        handlerClose={() => setIsOpenUserModal(false)}
      >
        <ChatUsersSelect
          chatId={Number(chatId)}
          users={dataUsers}
          participants={dataChat?.participants}
          isLoading={isLoadingUsers || isLoadingChat}
          isSaving={isSaving}
          saveError={saveError}
          onSave={handleSaveParticipants}
          onClose={() => setIsOpenUserModal(false)}
        />
      </Modal>
    </div>
  )
}
