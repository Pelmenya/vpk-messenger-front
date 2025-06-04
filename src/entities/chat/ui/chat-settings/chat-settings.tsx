import { FC } from "react"
import { IconUserCog } from "@tabler/icons-react"

// Пропсы для будущей логики
export type TChatSettingsProps = {
  onUserConfig?: () => void
}

export const ChatSettings: FC<TChatSettingsProps> = ({
  onUserConfig,
}) => {
  return (
      <button
        type="button"
        className="btn btn-circle btn-ghost text-[#999] hover:text-primary
                  focus:text-primary
                  active:text-primary
                  hover:bg-base-100 
                  
                  flex items-center justify-center"
        onClick={onUserConfig}
        aria-label="Настройки чата"
        tabIndex={0}
      >
        <IconUserCog className="w-6 h-6" />
      </button>
  )
}
