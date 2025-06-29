import { Header } from "@/widgets/header/header"
import { Layout } from "../shared/ui/layout/layout"
import { ChatSidebar } from "@/entities/chat/ui/chat-sidebar/chat-sidebar"
import { Outlet } from "react-router-dom"

export const ChatsPage = () => {
  return (
    <Layout isViewHeader={false}>
      <div className="w-full h-full max-w-7xl mx-auto flex bg-base-100">
        <ChatSidebar header={<Header className="flex justify-end" />} />
        <aside className="h-full w-full">
          <Outlet />
        </aside>
      </div>
    </Layout>
  )
}
