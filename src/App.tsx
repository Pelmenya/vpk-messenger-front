// App.tsx
import { useSelector } from "react-redux"
import { getUser } from "./entities/user/model/user-selectors"
import { getIsLoggedIn } from "./features/auth/model/auth-selectors"
import { AuthRouter } from "./app/auth-router"
import { AuthProvider } from "./app/auth-provider"

export const App = () => {
  const isLoggedIn = useSelector(getIsLoggedIn)
  const user = useSelector(getUser)

  return (
    <AuthProvider>
      <AuthRouter user={user} isLoggedIn={isLoggedIn} />
    </AuthProvider>
  )
}
