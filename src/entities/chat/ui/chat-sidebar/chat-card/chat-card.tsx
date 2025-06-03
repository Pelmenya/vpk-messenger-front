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
import { Link, useNavigate } from "react-router-dom"
import { getSelectedChatId } from "@/entities/chat/model/chat-selectors"
import { getUser } from "@/entities/user/model/user-selectors"
import { EUserType } from "@/entities/user/model/user.entity"

export const ChatCard: FC<{ chat: TChat; isActive: boolean }> = ({
  chat,
  isActive,
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [error, setError] = useState<string>("")
  const [deleteChat, { isLoading }] = useDeleteChatByIdMutation()
  const token = useAppSelector(getToken)
  const selectedChatId = useAppSelector(getSelectedChatId)
  const user = useAppSelector(getUser)

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
        navigate('/chats')
      } else {
        dispatch(setSelectedChatId(selectedChatId))
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
      <Link
        to={`/chats/${chat.chatId}`}
        className={cn(
          "h-16 w-full py-1 px-4 my-1 flex flex-col justify-between gap-2 rounded transition cursor-pointer group relative",
          {
            "bg-accent text-primary-content": isActive,
            "text-base-content hover:bg-info hover:text-primary-content":
              !isActive,
          },
        )}
        onClick={() => dispatch(setSelectedChatId(chat.chatId))}
      >
        <div className="flex">
          <div className="flex flex-col justify-between flex-1 min-w-0">
            <h6 className="text-sm font-semibold max-w-[100%] truncate">
              {chat.name}
            </h6>
          </div>
          {user?.userType.typeName === EUserType.Admin && (
            <div
              className="tooltip tooltip-left tooltip-warning flex items-center"
              data-tip="Удалить чат"
            >
              <button
                className="btn btn-circle btn-ghost btn-xs hover:text-primary hover:bg-base-300 outline-none
              flex items-center justify-center z-10"
                type="button"
                aria-label="Удалить чат"
                tabIndex={0}
                onClick={e => {
                  e.preventDefault() // чтобы не переходить по ссылке
                  e.stopPropagation()
                  setError("")
                  setConfirmOpen(true)
                }}
              >
                <IconBucket size={16} />
              </button>
            </div>
          )}
        </div>
        <p className="text-ex-min text-right px-1 truncate">
          {formatChatDate(chat.createdAt)}
        </p>
      </Link>
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
