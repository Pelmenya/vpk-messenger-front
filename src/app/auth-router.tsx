import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { ChatView } from "@/entities/chat/ui/chat-view/chat-view"
import { IndexPage } from "@/pages/index-page"
import { ChatsPage } from "@/pages/chats-page"
import { LoginPage } from "@/pages/login-page"
import { RegisterPage } from "@/pages/register-page"
import { ChatSelectDefault } from "@/entities/chat/ui/chat-selected-default/chat-selected-default"
import { useAppSelector } from "./hooks"
import { getIsLoggedIn } from "@/features/auth/model/auth-selectors"
import { getUser } from "@/entities/user/model/user-selectors"
import { Loading } from "@/shared/ui/loading/loading"

export const AuthRouter: FC<{ isAuthLoading: boolean }> = ({
  isAuthLoading,
}) => {
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const user = useAppSelector(getUser)

  if (isAuthLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading
          color="text-primary"
          size="loading-lg"
          type="loading-infinity"
          className="p-8"
        />
      </div>
    )

  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      {isLoggedIn && user ? (
        <>
          <Route path="/chats" element={<ChatsPage />}>
            <Route index element={<ChatSelectDefault />} />
            <Route path=":chatId" element={<ChatView />} />
          </Route>
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
