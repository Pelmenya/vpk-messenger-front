import { FC, useEffect, useState } from "react"
import { TParticipant } from "../../model/types/t-participant"

type Props = {
  chatId: number
  users?: TParticipant[]           // все пользователи
  participants?: TParticipant[]    // участники чата
  isLoading: boolean
  isSaving?: boolean
  saveError?: string | null
  onSave: (userIds: number[]) => void
  onClose: () => void
}

export const ChatUsersSelect: FC<Props> = ({
  users,
  participants,
  isLoading,
  isSaving,
  saveError,
  onSave,
  onClose,
}) => {
  // Получаем список id уже присутствующих в чате
  const participantsIds = participants?.map(p => p.userId) ?? []
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>(participantsIds)

  // Сброс выбранных при изменении участников
  useEffect(() => {
    setSelectedUserIds(participantsIds)
  }, [JSON.stringify(participantsIds)])

  const handleToggle = (userId: number) => {
    setSelectedUserIds(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSave = () => {
    onSave(selectedUserIds)
  }

  return (
    <div className="w-full mt-8 max-w-md mx-auto min-h-[380px] flex flex-col">
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
                disabled={isSaving}
              />
              <span>
                {user.displayName}
                <span className="ml-2 text-xs text-base-content/60">
                  @{user.username}
                </span>
              </span>
            </label>
          ))}
      </div>
      {saveError && (
        <div className="text-error text-sm mt-2">
          {saveError}
        </div>
      )}
      <div className="flex justify-end gap-2 mt-8">
        <button className="btn btn-ghost" onClick={onClose} disabled={isSaving}>
          Отмена
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isLoading || isSaving}
        >
          {isSaving
            ? <span className="loading loading-spinner"></span>
            : "Сохранить"}
        </button>
      </div>
    </div>
  )
}
