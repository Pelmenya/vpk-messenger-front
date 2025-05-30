import { FC, useRef, useState } from "react"
import { IconSend, IconPaperclip } from "@tabler/icons-react"

type Props = {
  onSend: (text: string, file?: File) => void
  disabled?: boolean
}

export const ChatInput: FC<Props> = ({ onSend, disabled }) => {
  const [value, setValue] = useState("")
  const [file, setFile] = useState<File | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (value.trim() || file) {
      onSend(value, file)
      setValue("")
      setFile(undefined)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className="flex items-center gap-2 p-3 bg-base-100 rounded-xl border border-base-300">
      <button
        type="button"
        className="btn btn-ghost btn-square"
        onClick={() => inputRef.current?.click()}
        tabIndex={-1}
        aria-label="Прикрепить файл"
      >
        <IconPaperclip size={22} />
      </button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={e => setFile(e.target.files?.[0])}
      />
      <input
        className="input input-bordered flex-1 rounded-xl"
        type="text"
        placeholder="Напишите сообщение..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
        disabled={disabled}
      />
      <button
        onClick={handleSend}
        className="btn btn-primary btn-square"
        disabled={disabled || (!value.trim() && !file)}
        aria-label="Отправить"
      >
        <IconSend size={22} />
      </button>
    </div>
  )
}
