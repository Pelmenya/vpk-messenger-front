import { FC } from "react"
import { IconPlus } from "@tabler/icons-react"

interface Props {
  onClick: () => void
}

export const ChatAddButton: FC<Props> = ({ onClick }) => (
  <div className="flex items-center gap-4 px-4 pb-2 justify-end">
    <button onClick={onClick} className="text-min cursor-pointer">Добавить чат</button>
    <button
      className="btn btn-circle btn-ghost btn-sm text-[#999] hover:text-primary
            hover:bg-base-300 outline-none ring-0 focus:ring-0 active:ring-0 focus:outline-none active:outline-none
            flex items-center justify-center"
      type="button"
      aria-label="Добавить чат"
      onClick={onClick}
    >
      <IconPlus size={18} />
    </button>
  </div>
)
