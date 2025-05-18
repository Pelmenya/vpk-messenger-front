import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import type { FC } from "react"
import { usePostLoginMutation } from "../api/auth-api"
import { InputField } from "../../../shared/ui/input-field/input-field"
import { FormWithTitle } from "../../../shared/ui/form-with-title/form-with-title"
import { TRegister } from "../model/types/t-register"

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Имя пользователя должно содержать минимум 3 символа")
    .max(20, "Имя пользователя не должно превышать 20 символов")
    .required("Имя пользователя обязательно"),
  password: yup
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .matches(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
    .matches(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
    .matches(
      /[@$!%*?&#]/,
      "Пароль должен содержать хотя бы один специальный символ @$!%*?&#",
    )
    .required("Пароль обязателен"),
})

export const LoginForm: FC = () => {
  const [postLogin] = usePostLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<TRegister, "displayName">>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const onSubmit = async (data: Omit<TRegister, "displayName">) => {
    try {
      const res = await postLogin(data)
      console.log("User registered successfully", res)
      //navigate("/chats-page")
    } catch (error) {
      console.error("Error registering user:", error)
    }
  }

  return (
    <FormWithTitle
      title="Вход"
      onSubmit={handleSubmit(onSubmit)}
      submitButtonText="Войти"
      formLink={{
        label: "Вы — новый пользователь?",
        href: '/register',
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
