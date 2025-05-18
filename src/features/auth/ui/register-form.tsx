import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState, type FC } from "react"
import { usePostLoginMutation, usePostRegisterMutation } from "../api/auth-api"
import { InputField } from "../../../shared/ui/input-field/input-field"
import { FormWithTitle } from "../../../shared/ui/form-with-title/form-with-title"
import { TRegister } from "../model/types/t-register"
import { schemaRegister } from "../model/schemas/schema-register"
import { TNullable } from "../../../shared/types/t-nullable"
import { useAppDispatch } from "../../../app/hooks"
import { setUser } from "../../../entities/user/model/user-slice"
import { login } from "../model/auth-slice"

export const RegisterForm: FC = () => {
  const dispatch = useAppDispatch()

  const [resError, setResError] = useState<TNullable<string>>(null)
  const [postRegister, { isLoading: isLoadingRegister }] =
    usePostRegisterMutation()
  const [postLogin, { isLoading: isLoadingLogin }] = usePostLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>({
    resolver: yupResolver(schemaRegister),
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const onSubmit = async (data: TRegister) => {
    setResError(null)
    try {
      // Попробуем выполнить регистрацию
      const resRegister = await postRegister(data).unwrap()

      if (resRegister.message === "Пользователь зарегистрирован.") {
        // Если регистрация успешна, выполняем логин
        const resLogin = await postLogin({
          username: data.username,
          password: data.password,
        }).unwrap()
        if (resLogin.user && resLogin.token) {
          dispatch(setUser(resLogin.user))
          dispatch(login(resLogin.token))
        }
        // Если логин успешен, можно выполнить навигацию
        // navigate("/chats-page")
      }
    } catch (error: any) {
      setResError(error.data?.message || "Произошла ошибка")
    }
  }

  return (
    <FormWithTitle
      error={resError}
      isLoading={isLoadingLogin || isLoadingRegister}
      title="Регистрация"
      onSubmit={handleSubmit(onSubmit)}
      submitButtonText="Зарегистрироваться"
      formLink={{
        label: "Уже зарегистрированы?",
        href: "/login",
        text: "Войти",
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
        type="text"
        label="Имя в чате"
        placeholder="Введите отображаемое имя"
        register={register}
        name="displayName"
        error={errors.displayName?.message}
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
