import { FC, ReactNode } from "react"
import { ThemeToggle } from "../../theme-toggle/theme-toggle"
import { MenuDropdown } from "../../../../features/auth/ui/menu-dropdown/menu-dropdown"
import { useAppSelector } from "../../../../app/hooks"
import { getUser } from "../../../../entities/user/model/user-selectors"

export const Header: FC<{ children?: ReactNode }> = () => {
  const user = useAppSelector(getUser)

  return (
    <header className="flex justify-end w-full py-8 px-12 bg-transparent fixed">
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {user && <MenuDropdown user={user} />}
      </div>
    </header>
  )
}
