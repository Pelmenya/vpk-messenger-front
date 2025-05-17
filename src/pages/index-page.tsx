import type { FC } from "react"
import { Intro } from "../features/intro/ui/intro"

export const IndexPage: FC = () => {
  return (
    <Intro>
        <div className="flex flex-col items-center gap-8 mb-20">
            <h1 className="text-7xl font-bold text-base-100 text-center">Добро пожаловать <br/> в Чат ВПК</h1>
            <button className="btn btn-primary btn-lg max-w-64">Войти</button>
        </div>
    </Intro>
  )
}
