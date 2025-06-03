import { FC } from "react"
import { IconPlus } from "@tabler/icons-react"

interface Props {
  onClick: () => void
}

export const ChatAddButton: FC<Props> = ({ onClick }) => (
  <div className="flex items-center gap-4 px-4 pb-2 justify-end">
    <span className="text-min">Добавить чат</span>
    <button
      className="btn btn-circle btn-ghost w-10 h-10 min-h-0 p-0 text-[#999] hover:text-primary
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
