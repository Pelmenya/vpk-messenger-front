import { useCallback, useEffect, type FC } from "react"
import { Intro } from "../features/intro/ui/intro"
import { useNavigate } from "react-router-dom"

export const IndexPage: FC = () => {
  const navigate = useNavigate()

  const handleOnClickEnter = useCallback(() => {
    void navigate("/login")
  }, [navigate])

  useEffect(() => {
    const timeoutId = setTimeout(handleOnClickEnter, 1000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [handleOnClickEnter])

  return (
    <Intro>
      <div className="flex flex-col items-center gap-8 mb-20">
        <h1 className="text-7xl font-bold text-base-100 text-center">
          Добро пожаловать <br />в Чат ВПК
        </h1>
        <button
          onClick={handleOnClickEnter}
          className="btn btn-primary btn-lg max-w-64"
        >
          Войти
        </button>
      </div>
    </Intro>
  )
}
