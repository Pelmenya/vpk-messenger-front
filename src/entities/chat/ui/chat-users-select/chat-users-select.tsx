import { FC, useEffect, useState } from "react"
import { TParticipant } from "../../model/types/t-participant"

type TUser = {
  userId: number
  username: string
  displayName: string
}

type Props = {
  chatId: number
  users?: TUser[] // все пользователи
  participants?: TParticipant[] // участники чата
  isLoading: boolean
  onSave: (userIds: number[]) => void
  onClose: () => void
}

export const ChatUsersSelect: FC<Props> = ({
  users,
  participants,
  isLoading,
  onSave,
  onClose,
}) => {
  // Список id пользователей, уже в чате
  const participantsIds = participants?.map(p => p.userId) ?? []
  const [selectedUserIds, setSelectedUserIds] =
    useState<number[]>(participantsIds)

  useEffect(() => {
    setSelectedUserIds(participantsIds)
  }, [JSON.stringify(participantsIds)])

  const handleToggle = (userId: number) => {
    setSelectedUserIds(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId],
    )
  }

  const handleSave = () => {
    onSave(selectedUserIds)
  }

  return (
    <div className="w-full max-w-md mx-auto min-h-[380px] flex flex-col">
      <h2 className="text-xl font-bold mb-8">Выберите участников чата</h2>
      <div className="space-y-2 max-h-72 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        {isLoading && (
          <>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-10 bg-base-200 rounded animate-pulse"
              ></div>
            ))}
          </>
        )}
        {!isLoading && users && users.length === 0 && (
          <div className="text-center text-base-content/60 py-8">
            Нет доступных пользователей
          </div>
        )}
        {!isLoading &&
          users &&
          users.map(user => (
            <label
              key={user.userId}
              className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded hover:bg-base-200 transition"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={selectedUserIds.includes(user.userId)}
                onChange={() => handleToggle(user.userId)}
              />
              <span>
                {user.displayName || user.username}
                <span className="ml-2 text-xs text-base-content/60">
                  @{user.username}
                </span>
              </span>
            </label>
          ))}
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <button className="btn btn-ghost" onClick={onClose}>
          Отмена
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isLoading}
        >
          Сохранить
        </button>
      </div>
    </div>
  )
}
