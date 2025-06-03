import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FC, useState } from "react"
import { useAppSelector } from "@/app/hooks"
import { getToken } from "@/features/auth/model/auth-selectors"
import { FormWithTitle } from "@/shared/ui/form-with-title/form-with-title"
import { InputField } from "@/shared/ui/input-field/input-field"
import { TNullable } from "@/shared/types/t-nullable"
import { usePostChatMutation, usePutChatByIdMutation } from "../../api/chat-api"
import { TChatCreateDto } from "../../model/types/t-chat-create.dto"
import { schemaChatCreate } from "../../model/schemas/schema-chat-create"
import { getUser } from "@/entities/user/model/user-selectors"

export const ChatCreateForm: FC<{ onSuccess?: () => void }> = ({
  onSuccess,
}) => {
  const token = useAppSelector(getToken)
  const user = useAppSelector(getUser)

  const [postChat, { isLoading }] = usePostChatMutation()
  const [putChat, { isLoading: isLoadingUpdate }] = usePutChatByIdMutation()
  const [resError, setResError] = useState<TNullable<string>>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TChatCreateDto>({
    resolver: yupResolver(schemaChatCreate),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (data: TChatCreateDto) => {
    setResError(null)
    try {
      const chat = await postChat({
        name: data.name,
        participants: [user?.userId || 0],
        authKey: token!,
      }).unwrap()
      await putChat({
        chatId: chat.chatId,
        name: data.name,
        participants: [user?.userId || 0],
        authKey: token!,
      })
      reset()
      onSuccess?.()
    } catch (e: any) {
      setResError(e?.data?.message || "Ошибка создания чата")
    }
  }

  return (
    <FormWithTitle
      title=""
      onSubmit={handleSubmit(onSubmit)}
      submitButtonText="Создать"
      error={resError}
      isLoading={isLoading || isLoadingUpdate}
    >
      <InputField
        type="text"
        label="Название чата"
        placeholder="Введите название чата"
        register={register}
        name="name"
        error={errors.name?.message}
      />
    </FormWithTitle>
  )
}
