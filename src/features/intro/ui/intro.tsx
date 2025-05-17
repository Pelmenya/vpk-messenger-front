import { type FC, type ReactNode } from "react"
import "./intro.css"

export const Intro: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="bg">{children}</div>
}
