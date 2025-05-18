import { FC, ReactNode } from "react"
import { ThemeToggle } from "../theme-toggle/theme-toggle"
import { MenuDropdown } from "../../../features/auth/ui/menu-dropdown/menu-dropdown"
import { useAppSelector } from "../../../app/hooks"
import { getUser } from "../../../entities/user/model/user-selectors"

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const user = useAppSelector(getUser)

  return (
    <div className="w-[100vw] h-[100vh] min-w-[100vw] min-h-[100vh] bg-base-300 relative">
      <header className="flex justify-end w-full py-8 px-12 bg-transparent fixed">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user && <MenuDropdown user={user} />}
        </div>
      </header>
      <main className="h-full w-full flex items-center justify-center">
        {children}
      </main>
    </div>
  )
}
