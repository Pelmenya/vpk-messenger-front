import { Header } from "@/widgets/header/header"
import { Layout } from "../shared/ui/layout/layout"
import { ChatSidebar } from "@/entities/chat/ui/chat-sidebar/chat-sidebar"

export const ChatPage = () => {
  return (
    <Layout isViewHeader={false}>
      <div className="w-full h-full max-w-7xl flex items-center justify-start bg-base-100">
        <h1 className="text-3xl font-bold mb-4 hidden">
          Добро пожаловать в чат!
        </h1>
        <ChatSidebar 
          header={<Header className="flex justify-end" />} 
        />
        <aside className="min-w-[75%] h-full"></aside>
      </div>
    </Layout>
  )
}
