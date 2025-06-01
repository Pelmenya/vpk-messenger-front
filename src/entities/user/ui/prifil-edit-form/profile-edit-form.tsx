import { useAppDispatch } from "@/app/hooks"
import { schemaRegister } from "@/features/auth/model/schemas/schema-register"
import { TRegister } from "@/features/auth/model/types/t-register"
import { TNullable } from "@/shared/types/t-nullable"
import { FormWithTitle } from "@/shared/ui/form-with-title/form-with-title"
import { InputField } from "@/shared/ui/input-field/input-field"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

export const ProfileEditForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [resError, setResError] = useState<TNullable<string>>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>({
    resolver: yupResolver(schemaRegister),
    mode: "onChange",
    reValidateMode: "onChange",
  })


    return(
            <FormWithTitle
              isLoading={false}
              error={''}
              title="Редактирование профиля"
              onSubmit={() => {}}
              submitButtonText="Сохранить"
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
                error={''}
              />
            </FormWithTitle>
        
    )
}