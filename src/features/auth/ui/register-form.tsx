import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import type { FC } from "react"
import { usePostLoginMutation, usePostRegisterMutation } from "../api/auth-api"
import { InputField } from "../../../shared/ui/input-field/input-field"
import { FormWithTitle } from "../../../shared/ui/form-with-title/form-with-title"
import { TRegister } from "../model/types/t-register"
import { schemaRegister } from "../model/schemas/schema-register"

export const RegisterForm: FC = () => {
  const [postRegister] = usePostRegisterMutation() // Используем мутацию для регистрации пользователя
  const [postLogin] = usePostLoginMutation() // Используем мутацию для логина пользователя в случае успешной регистрации

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
    try {
      const resRegister = await postRegister(data)
      if (resRegister?.data?.message === "Пользователь зарегистрирован.") {
        const resLogin = await postLogin({
          username: data.username,
          password: data.password,
        })
      }
      console.log("User registered successfully", resRegister)
      //navigate("/chats-page")
    } catch (error) {
      console.error("Error registering user:", error)
    }
  }

  return (
    <FormWithTitle
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
