import { Header } from "@/widgets/header/header"
import { Layout } from "../shared/ui/layout/layout"

export const ChatPage = () => {

  return (
    <Layout isViewHeader={false}>
      <div className="w-full h-full max-w-7xl flex items-center justify-start bg-base-100">
        <h1 className="text-3xl font-bold mb-4 hidden">Добро пожаловать в чат!</h1>
        
        <div className="min-w-[25%] h-full bg-base-200 p-4">
          <Header className="flex justify-end"/>

        </div>        
        <div className="min-w-[75%] h-full">
        </div>        
        
        
      </div>
    </Layout>
  )
}
