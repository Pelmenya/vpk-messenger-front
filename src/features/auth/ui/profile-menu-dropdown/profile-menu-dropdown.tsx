import { useAppDispatch } from "@/app/hooks"
import { TUser } from "@/entities/user/model/user.entity"
import { ProfileIcon } from "@/shared/ui/icons/profile-icon"
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react"
import { FC, Fragment } from "react"
import { menuLinksLogin, menuLinksLogout } from "./constants"
import { MenuLink } from "./components/menu-link"
import { logout } from "../../model/auth-slice"
import { clearUser } from "@/entities/user/model/user-slice"
import { AUTH_KEY_STORAGE } from "@/app/auth-provider"

export const ProfileMenuDropdown: FC<{ user: TUser }> = ({ user }) => {
  const dispatch = useAppDispatch()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        className="flex items-center cursor-pointer justify-center rounded-full h-8 w-8 bg-neutral text-sm text-neutral-content focus:outline-none focus:outline-none active:ring-2 active:ring-white active:ring-offset-2 active:ring-offset-gray-800"
        id="user-menu-button"
        aria-expanded="false"
        aria-haspopup="true"
      >
        <span className="sr-only">Open user menu</span>
        <>
          {user.profileImageUrl ? ( // будет аватар -> добавить ссылку в юзера
            <picture>
              <img
                className="h-8 w-8 rounded-full"
                src={import.meta.env.VITE_BACKEND_BASE_IMAGES_URL + user.profileImageUrl}
                alt={user.username}
              />
            </picture>
          ) : (
            <ProfileIcon />
          )}
        </>
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          as="ul"
          className="absolute z-50 right-0 mt-2 menu p-2 shadow-xl bg-base-100 border border-base-300 rounded-box w-52 outline-none ring-0"

        >
          {" "}
          {user
            ? menuLinksLogin.map(link => (
                <MenuLink
                  key={link.id}
                  href={link.href}
                  text={link.text}
                  type={link.type}
                  onClick={
                    link.type === "logout"
                      ? async () => {
                          dispatch(logout())
                          localStorage.removeItem(AUTH_KEY_STORAGE)
                          dispatch(clearUser())

                        }
                      : undefined
                  }
                />
              ))
            : menuLinksLogout.map(link => (
                <MenuLink
                  key={link.id}
                  href={link.href}
                  text={link.text}
                  type={link.type}
                />
              ))}
        </MenuItems>
      </Transition>
    </Menu>
  )
}
