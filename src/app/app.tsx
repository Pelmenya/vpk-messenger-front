import { AuthRouter } from "./auth-router"
import { AuthProvider } from "./auth-provider"

export const App = () => {
  return (
    <AuthProvider>
      <AuthRouter />
    </AuthProvider>
  )
}
