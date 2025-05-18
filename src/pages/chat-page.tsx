import { Layout } from "../shared/ui/layout/layout"
import { useAppDispatch } from "../app/hooks"
import { logout } from "../features/auth/model/auth-slice"
import { clearUser } from "../entities/user/model/user-slice"

export const ChatPage = () => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearUser())
  }

  return (
    <Layout>
      <div className="w-full h-full max-w-7xl flex flex-col items-center justify-center bg-base-100">
        <h1 className="text-3xl font-bold mb-4">Добро пожаловать в чат!</h1>
        <button className="btn btn-primary" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </Layout>
  )
}
