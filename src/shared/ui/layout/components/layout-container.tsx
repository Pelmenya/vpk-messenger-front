import { FC, ReactNode } from "react"

export const LayoutContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-[100vw] h-[100vh] min-w-[100vw] min-h-[100vh] bg-base-300 relative">
      {children}
    </div>
  )
}
