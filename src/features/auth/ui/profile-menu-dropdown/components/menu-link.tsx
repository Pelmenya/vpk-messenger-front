import { Link } from "react-router-dom"
import { ReactNode } from "react"
import { LoginIcon } from "@/shared/ui/icons/login-icon"
import { ProfileIcon } from "@/shared/ui/icons/profile-icon"
import { LogoutIcon } from "@/shared/ui/icons/logout-icon"

export type TMenuLinkProps = Partial<{
  children: ReactNode
}> & {
  id?: string
  href: string
  text: string
  type?: "profile" | "logout" | "login"
  onClick?: () => void
}

export const MenuLink = ({
  children,
  href,
  text,
  type,
  onClick,
}: TMenuLinkProps) => {
  return (
    <li onClick={onClick} role="listitem" className="rounded-md">
      <Link to={href} role="link" className="rounded-md">
        <div className="flex h-full w-full" role="cell">
          {type === "login" && <LoginIcon />}
          {type === "profile" && <ProfileIcon />}
          {type === "logout" && <LogoutIcon />}
          {children}
          <span className="block ml-2" role="textbox">
            {text}
          </span>
        </div>
      </Link>
    </li>
  )
}
