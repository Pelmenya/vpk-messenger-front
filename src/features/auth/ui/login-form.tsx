import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState, type FC } from "react"
import { usePostLoginMutation } from "../api/auth-api"
import { InputField } from "../../../shared/ui/input-field/input-field"
import { FormWithTitle } from "../../../shared/ui/form-with-title/form-with-title"
import { TRegister } from "../model/types/t-register"
import { schemaLogin } from "../model/schemas/schema-login"
import { TNullable } from "../../../shared/types/t-nullable"
import { useAppDispatch } from "../../../app/hooks"
import { setUser } from "../../../entities/user/model/user-slice"
import { login } from "../model/auth-slice"

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch()
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
        dispatch(login(resLogin.token))
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
