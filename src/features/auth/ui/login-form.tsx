import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState, type FC } from "react"
import { useAppDispatch } from "@/app/hooks"
import { TNullable } from "@/shared/types/t-nullable"
import { usePostLoginMutation } from "../api/auth-api"
import { TRegister } from "../model/types/t-register"
import { schemaLogin } from "../model/schemas/schema-login"
import { setUser } from "@/entities/user/model/user-slice"
import { setToken } from "../model/auth-slice"
import { FormWithTitle } from "@/shared/ui/form-with-title/form-with-title"
import { InputField } from "@/shared/ui/input-field/input-field"
import { AUTH_KEY_STORAGE } from "@/app/auth-provider"
import { useNavigate } from "react-router-dom"

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [resError, setResError] = useState<TNullable<string>>(null)

  const [postLogin, { isLoading }] = usePostLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<TRegister, "displayName">>({
    resolver: yupResolver(schemaLogin),
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const onSubmit = async (data: Omit<TRegister, "displayName">) => {
    setResError(null)
    try {
      const resLogin = await postLogin({
        username: data.username,
        password: data.password,
      }).unwrap()
      if (resLogin.user && resLogin.token) {
        dispatch(setUser(resLogin.user))
        dispatch(setToken(resLogin.token))
        localStorage.setItem(
          AUTH_KEY_STORAGE,
          JSON.stringify({ token: resLogin.token }),
        )
        // Если логин успешен, можно выполнить навигацию
        navigate("/chats-page")
      }
    } catch (error: any) {
      setResError(error.data?.message || "Произошла ошибка")
    }
  }

  return (
    <FormWithTitle
      isLoading={isLoading}
      error={resError}
      title="Вход"
      onSubmit={handleSubmit(onSubmit)}
      submitButtonText="Войти"
      formLink={{
        label: "Вы — новый пользователь?",
        href: "/register",
        text: "Зарегистрироваться",
      }}
    >
      <InputField
        type="text"
        placeholder="Введите имя"
        label="Имя"
        register={register}
        name="username"
        error={errors.username?.message}
      />
      <InputField
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
        register={register}
        name="password"
        error={errors.password?.message}
      />
    </FormWithTitle>
  )
}
