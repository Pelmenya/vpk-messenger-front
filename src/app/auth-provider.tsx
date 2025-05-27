import { FC, ReactNode, useEffect, useState } from "react"
import { useAppDispatch } from "./hooks"
import { setUser } from "@/entities/user/model/user-slice"
import { setToken, logout } from "@/features/auth/model/auth-slice"
import { useLazyGetUserMeQuery } from "@/entities/user/api/user-api"

export const AUTH_KEY_STORAGE = "auth"

type TAuthProviderProps = {
  children: (isAuthLoading: boolean) => ReactNode;
};


export const AuthProvider: FC<TAuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const [fetchUserMe ] = useLazyGetUserMeQuery()
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      let token: string | null = null
      const stored = localStorage.getItem(AUTH_KEY_STORAGE);
      
      if (stored) {
        try {
          token = JSON.parse(stored).token
        } catch (e) {

        }
      }

      if (!token) {
        dispatch(setUser(null))
        dispatch(setToken(null))
        setIsAuthLoading(false); // <-- Устанавливаем "загрузка завершена"
        return
      }

      dispatch(setToken(token))

      try {
        const user = await fetchUserMe({ authKey: token }).unwrap()
        
        dispatch(setUser(user))

      } catch (e) {
        dispatch(setUser(null))
        dispatch(logout())
        localStorage.removeItem(AUTH_KEY_STORAGE)
      }
      setIsAuthLoading(false); // <-- Устанавливаем "загрузка завершена"
    }

    checkAuth()
  }, [dispatch, fetchUserMe])

  return <>{children(isAuthLoading)}</>;
}