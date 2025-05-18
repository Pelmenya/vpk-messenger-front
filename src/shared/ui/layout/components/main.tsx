import { FC, ReactNode } from "react"

export const Main: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <main className="h-full w-full flex items-center justify-center">
      {children}
    </main>
  )
}
