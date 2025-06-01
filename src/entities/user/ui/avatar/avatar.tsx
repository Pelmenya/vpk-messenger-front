import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useState, useRef, useEffect, FC } from "react"
import { getUser } from "../../model/user-selectors"
import { Modal } from "@/shared/ui/modal/modal"
import { setBaseImageUrl } from "@/shared/lib/helpers/set-base-image-url"
import { getToken } from "@/features/auth/model/auth-selectors"
import { usePutUserAvatarMutation } from "../../api/user-api"
import { setUserAvatar } from "../../model/user-slice"
import { EMPTY_PIC_PLACEHOLDER } from "@/shared/lib/constants/empty-pic-placeholder"
import { getAvatarBg } from "@/shared/lib/helpers/get-avatar-bg"

export const Avatar: FC = () => {
  const user = useAppSelector(getUser)
  const token = useAppSelector(getToken)

  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [preview, setPreview] = useState<string>(
    setBaseImageUrl(user?.profileImageUrl || ""),
  )
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [putUserAvatar, { isLoading }] = usePutUserAvatarMutation()

  // Сброс preview при открытии модалки
  useEffect(() => {
    if (isOpen) {
      setPreview(setBaseImageUrl(user?.profileImageUrl || ""))
      setFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }, [isOpen, user?.profileImageUrl])

  // Ловим внешнюю смену profileImageUrl
  useEffect(() => {
    if (!isOpen) setPreview(setBaseImageUrl(user?.profileImageUrl || ""))
  }, [user?.profileImageUrl, isOpen])

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    const formData = new FormData()
    formData.append("file", file)

    const authKey = token

    if (!authKey) return
    try {
      const { url } = await putUserAvatar({
        body: formData,
        authKey,
      }).unwrap()
      if (url) {
        dispatch(setUserAvatar(url))
      }
      setIsOpen(false)
    } catch (e) {
      // обработать ошибку
      alert("Ошибка загрузки аватара")
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} handlerClose={handleClose} title="Загрузите файл">
        <form
          className="flex flex-col items-center gap-6 min-w-[280px]"
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col items-center cursor-pointer text-info">
            <div
              className="w-32 h-32 rounded-full bg-gray-200 bg-center bg-cover flex items-center justify-center"
              style={{
                backgroundImage: preview
                  ? `url(${preview})`
                  : EMPTY_PIC_PLACEHOLDER,
              }}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              className="hidden"
              onChange={handleFileChange}
            />
            Нажмите на аватар
          </label>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Поменять"}
          </button>
        </form>
      </Modal>
      <div
        onClick={handleOpen}
        className="relative w-36 h-36 rounded-full bg-gray-200 bg-center bg-cover cursor-pointer flex items-center justify-center group"
        style={{
          backgroundImage: getAvatarBg(user?.profileImageUrl || ""),
        }}
      >
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 rounded-full transition" />
        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition font-bold">
          Поменять фото
        </span>
      </div>
    </div>
  )
}
