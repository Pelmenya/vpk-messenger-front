import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import type { FC } from "react"
import { usePostRegisterMutation } from "../api/auth-api"
import { InputField } from "../../../shared/ui/input-field/input-field"
import { FormWithTitle } from "../../../shared/ui/form-with-title/form-with-title"
import { TRegister } from "../model/types/t-register"

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Имя пользователя должно содержать минимум 3 символа")
    .max(20, "Имя пользователя не должно превышать 20 символов")
    .required("Имя пользователя обязательно"),
  displayName: yup
    .string()
    .min(3, "Отображаемое имя должно содержать минимум 3 символа")
    .max(20, "Отображаемое имя не должно превышать 20 символов")
    .required("Отображаемое имя обязательно"),
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

export const RegisterForm: FC = () => {
  const [postRegister] = usePostRegisterMutation() // Используем мутацию для регистрации пользователя

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const onSubmit = async (data: TRegister) => {
    try {
      const res = await postRegister(data)
      console.log("User registered successfully", res)
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
