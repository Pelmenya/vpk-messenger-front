import { FC, ReactNode } from "react"
import { useAppSelector } from "@/app/hooks"
import { getUser } from "@/entities/user/model/user-selectors"
import { ProfileMenuDropdown } from "@/features/auth/ui/profile-menu-dropdown/profile-menu-dropdown"
import { ThemeToggle } from "@/widgets/theme-toggle/theme-toggle"

export const Header: FC<{ children?: ReactNode }> = () => {
  const user = useAppSelector(getUser)

  return (
    <header className="flex justify-end w-full py-8 px-12 bg-transparent fixed">
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {user && <ProfileMenuDropdown user={user} />}
      </div>
    </header>
  )
}
