import { FC, ReactNode } from "react"
import { useAppSelector } from "@/app/hooks"
import { getUser } from "@/entities/user/model/user-selectors"
import { ProfileMenuDropdown } from "@/features/auth/ui/profile-menu-dropdown/profile-menu-dropdown"
import { ThemeToggle } from "@/widgets/theme-toggle/theme-toggle"
import cn from "classnames"

export const Header: FC<{ children?: ReactNode; className?: string }> = ({
  className,
  children,
}) => {
  const user = useAppSelector(getUser)

  return (
    <header
      className={cn(
        className
          ? className
          : "flex justify-end w-full py-8 px-12 bg-transparent fixed",
      )}
    >
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {user && <ProfileMenuDropdown user={user} />}
        {children}
      </div>
    </header>
  )
}
