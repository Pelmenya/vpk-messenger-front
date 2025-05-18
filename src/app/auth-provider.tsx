import { useEffect, type FC, type ReactNode } from "react"
import { useAppDispatch } from "./hooks"
import { loadAuthFromStorage } from "../features/auth/model/auth-slice"
import { loadUserFromStorage } from "../entities/user/model/user-slice"

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Здесь можно сделать серьезную логику, аутентификациии
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Загружаем состояние аутентификации из localStorage
    dispatch(loadAuthFromStorage())
    // Загружаем состояние user из localStorage
    dispatch(loadUserFromStorage())
  }, [dispatch, loadAuthFromStorage])

  return <>{children}</>
}
