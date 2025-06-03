import { TChat } from "@/entities/chat/model/types/t-chat"
import { formatChatDate } from "@/shared/lib/helpers/format-chat-data"
import { FC, useState } from "react"
import cn from "classnames"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { setSelectedChatId } from "@/entities/chat/model/chat-slice"
import { IconBucket } from "@tabler/icons-react"
import { ConfirmDialog } from "@/shared/ui/confirm-dialog/confirm-dialog"
import {
  useDeleteChatByIdMutation,
  useGetChatsQuery,
} from "@/entities/chat/api/chat-api"
import { getToken } from "@/features/auth/model/auth-selectors"
import { Link } from "react-router-dom"
import { getSelectedChatId } from "@/entities/chat/model/chat-selectors"

export const ChatCard: FC<{ chat: TChat; isActive: boolean }> = ({
  chat,
  isActive,
}) => {
  const dispatch = useAppDispatch()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [error, setError] = useState<string>("")
  const [deleteChat, { isLoading }] = useDeleteChatByIdMutation()
  const token = useAppSelector(getToken)
  const selectedChatId = useAppSelector(getSelectedChatId);

  const { refetch: refetchChats } = useGetChatsQuery(token!, { skip: !token })

  const handleDelete = async () => {
    setError("")
    try {
      await deleteChat({ chatId: chat.chatId, authKey: token || "" }).unwrap()
      setConfirmOpen(false)
      await refetchChats()
      // сбрасываем выбранный чат, если удалили его
      if (selectedChatId === chat.chatId) {
        dispatch(setSelectedChatId(null))
      }
    } catch (e: any) {
      setError(
        e?.data?.message ||
          e?.message ||
          "Не удалось удалить чат. Попробуйте ещё раз.",
      )
    }
  }

  return (
    <>
      <div
        className={cn(
          "h-16 w-full py-1 px-4 my-1 flex justify-between gap-2 transition items-center",
          {
            "bg-accent text-primary-content": isActive,
            "text-base-content hover:bg-info hover:text-primary-content":
              !isActive,
          },
        )}
      >
        <Link
          to={`/chats/${chat.chatId}`}
          className="flex flex-col w-full h-full justify-between flex-1 min-w-0"
          onClick={() => dispatch(setSelectedChatId(chat.chatId))}
        >
          <div className="flex items-center justify-between w-full">
            <h6 className="text-sm font-semibold max-w-[80%] truncate">
              {chat.name}
            </h6>
          </div>
          <p className="text-ex-min text-right px-1">
            {formatChatDate(chat.createdAt)}
          </p>
        </Link>
        <div
          className="tooltip tooltip-left tooltip-warning flex items-center"
          data-tip="Удалить чат"
        >
          <button
            className="btn btn-circle btn-ghost btn-xs hover:text-primary
              hover:bg-base-300 outline-none ring-0 focus:ring-0 active:ring-0 focus:outline-none active:outline-none
              flex items-center justify-center"
            type="button"
            aria-label="Удалить чат"
            tabIndex={0}
            onClick={e => {
              e.stopPropagation()
              setError("") // сбрасываем ошибку при открытии
              setConfirmOpen(true)
            }}
          >
            <IconBucket size={16} />
          </button>
        </div>
      </div>
      <ConfirmDialog
        title="Удалить чат?"
        description={`Вы уверены, что хотите удалить чат ${chat.name}? Это действие нельзя отменить.`}
        isOpen={confirmOpen}
        onClose={() => {
          setError("")
          setConfirmOpen(false)
        }}
        onConfirm={handleDelete}
        loading={isLoading}
        confirmText="Удалить"
        cancelText="Отмена"
        error={error}
      />
    </>
  )
}
