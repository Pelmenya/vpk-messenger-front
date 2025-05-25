import { FC, ReactNode } from "react"

export const Main: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <main className="h-full w-full">
      {children}
    </main>
  )
}