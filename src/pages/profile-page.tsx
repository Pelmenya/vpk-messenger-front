import { ChatIcon } from "@/entities/message/ui/chat-icon/chat-icon"
import { Avatar } from "@/entities/user/ui/avatar/avatar"
import { ProfileEditForm } from "@/entities/user/ui/profile-edit-form/profile-edit-form"
import { Layout } from "@/shared/ui/layout/layout"
import { FC } from "react"
import { Link } from "react-router-dom"

export const ProfilePage: FC = () => {
  return (
    <Layout isViewHeader={true}>
      <div className="w-full h-full max-w-7xl flex bg-base-100">
        {/* Левая колонка с иконкой чата */}
        <Link
          to="/chats"
          className="flex items-center justify-center px-4 bg-base-200"
        >
          <ChatIcon
            type="send"
            className="w-7 h-7 rounded rounded-full bg-primary rotate-180 hover:bg-error cursor-pointer"
          />
        </Link>
        {/* Правая часть - профиль */}
        <div className="w-full h-full flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
          <div className="flex flex-col items-center gap-8 max-w-md mx-auto py-8 px-2 sm:py-12">
            {/* Responsive размер аватара */}
            <div className="w-28 h-28 sm:w-36 sm:h-36">
              <Avatar />
            </div>
            <ProfileEditForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}