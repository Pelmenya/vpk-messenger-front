import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { ChatView } from "@/entities/chat/ui/chat-view/chat-view"
import { TNullable } from "@/shared/types/t-nullable"
import { TUser } from "@/entities/user/model/user.entity"
import { IndexPage } from "@/pages/index-page"
import { ChatPage } from "@/pages/chat-page"
import { LoginPage } from "@/pages/login-page"
import { RegisterPage } from "@/pages/register-page"
import { ChatSelectDefault } from "@/entities/chat/ui/chat-selected-default/chat-selected-default"

export const AuthRouter: FC<{
  isLoggedIn: boolean
  user: TNullable<TUser>
}> = ({ isLoggedIn, user }) => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      {isLoggedIn && user ? (
        <>
          <Route path="/chats" element={<ChatPage />}>
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
