import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useState, useRef, useEffect } from "react"
import { getUser } from "../../model/user-selectors"
import { Modal } from "@/shared/ui/modal/modal"
import { setBaseImageUrl } from "@/shared/lib/helpers/setBaseImageUrl"
// import { useUpdateProfileMutation } from '@/redux/api/common-api'
// import { setUser } from '@/redux/slices/user-slice'

const PLACEHOLDER = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='-30 -30 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M36 2H4C2.89543 2 2 2.89543 2 4V25.2667L14.6547 22.3139C15.5486 22.1053 16.4635 22 17.3814 22H22.6186C23.5365 22 24.4514 22.1053 25.3453 22.3139L38 25.2667V4C38 2.89543 37.1046 2 36 2ZM4 0C1.79086 0 0 1.79086 0 4V36C0 38.2091 1.79086 40 4 40H36C38.2091 40 40 38.2091 40 36V4C40 1.79086 38.2091 0 36 0H4ZM10.9091 14.5455C12.9174 14.5455 14.5455 12.9174 14.5455 10.9091C14.5455 8.90079 12.9174 7.27273 10.9091 7.27273C8.90082 7.27273 7.27276 8.90079 7.27276 10.9091C7.27276 12.9174 8.90082 14.5455 10.9091 14.5455Z' fill='%23CDCDCD'/%3E%3C/svg%3E")`

const getAvatarBg = (url?: string) => {
  if (!url) return PLACEHOLDER
  return `url("${setBaseImageUrl(url)}")`
}

export const Avatar = () => {
  const user = useAppSelector(getUser)
  const dispatch = useAppDispatch()
  // const [updateUser] = useUpdateProfileMutation()

  const [isOpen, setIsOpen] = useState(false)
  const [preview, setPreview] = useState<string>(
    setBaseImageUrl(user?.profileImageUrl || ""),
  )
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

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
    formData.append("avatars", file)
    // const updatedUser = await updateUser(formData).unwrap()
    // dispatch(setUser(updatedUser))
    setIsOpen(false)
  }

  return (
    <div>
      <Modal isOpen={isOpen} handlerClose={handleClose} title="Загрузите файл">
        <form
          className="flex flex-col items-center gap-6 min-w-[280px]"
          onSubmit={handleSubmit}
        >
          <label className="block cursor-pointer">
            <div
              className="w-32 h-32 rounded-full bg-gray-200 bg-center bg-cover flex items-center justify-center"
              style={{
                backgroundImage: preview ? `url(${preview})` : PLACEHOLDER,
              }}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <button type="submit" className="btn btn-primary w-full">
            Поменять
          </button>
        </form>
      </Modal>
      <div
        onClick={handleOpen}
        className="relative w-36 h-36 rounded-full bg-gray-200 bg-center bg-cover cursor-pointer flex items-center justify-center group"
        style={{
          backgroundImage: getAvatarBg(user?.profileImageUrl || ''),
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-0 rounded-full transition" />
        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition font-bold">
          Поменять фото
        </span>
      </div>
    </div>
  )
}
