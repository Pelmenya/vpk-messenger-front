// App.tsx
import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { IndexPage } from "./pages/index-page"
import { LoginPage } from "./pages/login-page"
import { RegisterPage } from "./pages/register-page"
import { ChatPage } from "./pages/chat-page"
import { getUser } from "./entities/user/model/user-selectors"
import { getIsLoggedIn } from "./features/auth/model/auth-selectors"

export const App = () => {
  const isLoggedIn = useSelector(getIsLoggedIn)
  const user = useSelector(getUser)

  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      {isLoggedIn && user ? (
        <>
          <Route path="/chats" element={<ChatPage />} />
          <Route path="*" element={<Navigate to="/chats" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  )
}
