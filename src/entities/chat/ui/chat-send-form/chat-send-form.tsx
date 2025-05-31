import { PaperclipIcon } from "@/shared/ui/icons/paper-clip-icon"
import React, { useRef, useState } from "react"
import { ChatIcon } from "../chat-messages/ui/chat-icon/chat-icon"

export const ChatSendForm = ({
  onSend,
  iconColor = "text-primary",
}: {
  onSend?: (msg: string) => void
  iconColor?: string // tailwind класс для управления цветом
}) => {
  const [message, setMessage] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim().length > 1) {
      onSend?.(message.trim())
      setMessage("")
      inputRef.current?.focus()
    }
  }

  return (
    <form
      className="flex w-full items-center gap-2 bg-base-100 py-3 rounded-t-lg"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      {/* Кнопка добавить ресурс */}
      <div className="relative">
        <button
          type="button"
          tabIndex={0}
          className={`
            mr-4
            ml-4
            h-7 w-7
            flex items-center justify-center
            transition-colors
            focus:outline-none
            text-[#999]
            hover:text-primary
            focus:text-primary
            active:text-primary
          `}
          aria-label="Добавить ресурс"
          onClick={() => setMenuOpen(v => !v)}
          onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
        >
          <PaperclipIcon className="w-12 h-10" />
        </button>
        {menuOpen && (
          <div className="absolute left-0 bottom-9 z-20 w-48 bg-base-100 border border-base-300 shadow-lg rounded-xl p-2 flex flex-col">
            <button
              type="button"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-base-200 mb-2"
            >
              <ChatIcon type="photo" className={`w-6 h-6 mr-3 ${iconColor}`} />
              <span className="text-base-content">Фото</span>
            </button>
            <button
              type="button"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-base-200 mb-2"
            >
              <ChatIcon type="file" className={`w-6 h-6 mr-3 ${iconColor}`} />
              <span className="text-base-content">Файл</span>
            </button>
            <button
              type="button"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-base-200"
            >
              <ChatIcon
                type="location"
                className={`w-6 h-6 mr-3 ${iconColor}`}
              />
              <span className="text-base-content">Локация</span>
            </button>
          </div>
        )}
      </div>
      {/* input для сообщения */}
      <input
        ref={inputRef}
        className="input input-bordered rounded-full bg-base-200 flex-1 text-sm px-5 py-3 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
        name="message"
        type="text"
        placeholder="Сообщение"
        required
        minLength={2}
        maxLength={1000}
        value={message}
        onChange={e => setMessage(e.target.value)}
        onFocus={() => setMenuOpen(false)}
      />
      {/* Кнопка отправки */}
      <button
        type="submit"
        className="outline-none border-none bg-transparent cursor-pointer h-7 w-7 ml-2 flex items-center justify-center"
        tabIndex={0}
        disabled={message.trim().length < 2}
      >
        <ChatIcon type="send" className={`w-7 h-7 ${iconColor}`} />
      </button>
    </form>
  )
}
