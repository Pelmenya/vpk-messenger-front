import { ChatIcon } from "@/entities/message/ui/chat-icon/chat-icon"
import { Layout } from "@/shared/ui/layout/layout"
import { FC } from "react"
import { Link } from "react-router-dom"

export const ProfilePage: FC = () => {
  return (
    <Layout isViewHeader={true}>
      <div className="w-full h-full max-w-7xl mx-auto flex bg-base-100">
        <Link
          to="/chats"
          className="flex items-center justify-center px-4 bg-base-200"
        >
          <ChatIcon
            type="send"
            className={`w-7 h-7 rounded rounded-full bg-primary rotate-180 hover:bg-error cursor-pointer`}
          />
        </Link>
      </div>
    </Layout>
  )
}
