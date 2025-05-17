import { FC, ReactNode } from "react"
import { ThemeToggle } from "../theme-toggle/theme-toggle"

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-[100vw] h-[100vh] min-w-[100vw] min-h-[100vh] bg-base-300 relative">
      <header className="flex justify-end w-full py-8 px-12 bg-transparent fixed">
        <ThemeToggle />
      </header>
      <main className="h-full w-full">
        {children}
        </main>
    </div>
  )
}
