import { type FC, type ReactNode } from "react"
import bgImage from './bg.jpg';

<img src={bgImage} alt="Background" />

export const Intro: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center">
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-neutral opacity-60 z-1"></div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
