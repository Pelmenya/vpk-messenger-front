import { FC, JSX } from "react"

export const ChatSidebar: FC<{ header?: JSX.Element }> = ({ header }) => {
  return (
    <aside className="min-w-[25%] h-full bg-base-200 p-4">
        {header}
        
    </aside>
    )
}
