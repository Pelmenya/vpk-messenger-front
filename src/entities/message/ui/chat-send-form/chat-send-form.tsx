import { PaperclipIcon } from "@/shared/ui/icons/paper-clip-icon"
import React, { useRef, useState, useEffect } from "react"
import { ChatIcon } from "../chat-icon/chat-icon"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { getSelectedChatId } from "@/entities/chat/model/chat-selectors"
import { getToken } from "@/features/auth/model/auth-selectors"
import { useSendFileMessageMutation } from "@/entities/message/api/message-api"
import { ChatEmojiPicker } from "../chat-emoji-picker/chat-emoji-picker"
import { Spinner } from "@/shared/ui/spiner/spiner"
import { getBestLocation } from "@/shared/lib/helpers/get-best-location"



export const ChatSendForm = ({
  iconColor = "text-primary",
}: {
  iconColor?: string
}) => {
  const dispatch = useAppDispatch()
  const chatId = useAppSelector(getSelectedChatId)
  const token = useAppSelector(getToken)

  const [message, setMessage] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const [locating, setLocating] = useState(false)
  const [locCountdown, setLocCountdown] = useState(8)
  const [locAccuracy, setLocAccuracy] = useState<number | null>(null)
  const locationCancelRef = useRef<(() => void) | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [sendFileMessage, { isLoading: isFileLoading }] =
    useSendFileMessageMutation()

  useEffect(() => {
    if (!locating) return
    setLocCountdown(8)
    const interval = setInterval(() => {
      setLocCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [locating])

  // Открытие input'а для фото
  const handlePhotoClick = () => {
    photoInputRef.current?.click()
    setMenuOpen(false)
  }

  // Открытие input'а для файлов
  const handleFileClick = () => {
    fileInputRef.current?.click()
    setMenuOpen(false)
  }

  // Отправка файла или фото
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!chatId || !token) return

    try {
      await sendFileMessage({
        chatId,
        file,
        authKey: token,
      }).unwrap()
    } catch (e) {
      alert("Ошибка загрузки файла")
    }
    e.target.value = ""
  }

  // Вставка emoji на место курсора
  const handleEmojiSelect = (emoji: string) => {
    const input = inputRef.current
    if (!input) return
    const start = input.selectionStart || 0
    const end = input.selectionEnd || 0
    const newValue = message.slice(0, start) + emoji + message.slice(end)
    setMessage(newValue)
    setShowEmoji(false)
    setTimeout(() => {
      input.focus()
      input.setSelectionRange(start + emoji.length, start + emoji.length)
    }, 0)
  }

  // Отправка текстового сообщения через SignalR middleware
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim().length < 2) return
    if (!chatId || !token) return

    dispatch({
      type: "chat/sendMessage",
      payload: {
        chatId,
        message: message.trim(),
      },
    })

    setMessage("")
    inputRef.current?.focus()
  }

  // Оптимизированная отправка локации
  const handleSendLocation = () => {
    if (!chatId || !token) return

    if (!navigator.geolocation) {
      alert("Геолокация не поддерживается вашим браузером.")
      return
    }

    setLocating(true)
    setLocAccuracy(null)
    locationCancelRef.current = getBestLocation(
      position => {
        setLocating(false)
        setLocAccuracy(null)
        const { latitude, longitude } = position.coords
        dispatch({
          type: "chat/sendMessage",
          payload: {
            chatId,
            message: `[location]${latitude},${longitude}`,
          },
        })
        setMenuOpen(false)
      },
      error => {
        setLocating(false)
        setLocAccuracy(null)
        alert("Не удалось получить локацию: " + error.message)
        setMenuOpen(false)
      },
      40, // min accuracy (метров)
      8000, // max wait (мс)
      acc => setLocAccuracy(acc),
    )
  }

  // Отмена поиска локации
  const handleCancelLocation = () => {
    locationCancelRef.current?.()
    setLocating(false)
    setLocAccuracy(null)
  }

  return (
    <form
      className="flex w-full items-center gap-2 bg-base-100 py-3 rounded-t-lg"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      {/* Кнопка добавить ресурс */}
      <div className="relative">
        <button className="btn btn-ghost btn-circle" type="button" tabIndex={0}>
          <div
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
            cursor-pointer
          `}
            aria-label="Добавить ресурс"
            onClick={() => {
              setMenuOpen(v => !v)
              setShowEmoji(false)
            }}
            onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
          >
            <PaperclipIcon className="w-12 h-10" />
          </div>
        </button>
        {menuOpen && (
          <div className="absolute bottom-12 left-0 z-20 w-56 bg-base-100 border border-base-300 shadow-lg rounded-xl p-2 flex flex-col">
            <button
              type="button"
              className="flex items-center cursor-pointer px-3 py-2 rounded-lg hover:bg-base-200 mb-2"
              onClick={handlePhotoClick}
              disabled={isFileLoading}
            >
              <ChatIcon type="photo" className={`w-6 h-6 mr-3 ${iconColor}`} />
              <span className="text-base-content">Фото</span>
            </button>
            <button
              type="button"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-base-200 mb-2 cursor-pointer"
              onClick={handleFileClick}
              disabled={isFileLoading}
            >
              <ChatIcon type="file" className={`w-6 h-6 mr-3 ${iconColor}`} />
              <span className="text-base-content">Файл</span>
            </button>
            <button
              type="button"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-base-200 cursor-pointer relative"
              onClick={handleSendLocation}
              disabled={isFileLoading || locating}
            >
              <ChatIcon
                type="location"
                className={`w-6 h-6 mr-3 ${iconColor}`}
              />
              <span className="text-base-content flex items-center">
                Локация
                {locating && (
                  <span className="ml-2 flex items-center animate-fade-in">
                    <Spinner />
                    <span className="ml-1 text-xs text-base-content/80 tabular-nums select-none">
                      {locCountdown}s
                    </span>
                    {locAccuracy !== null && (
                      <span className="ml-1 text-xs text-base-content/60 select-none">
                        {Math.round(locAccuracy)}м
                      </span>
                    )}
                    <button
                      type="button"
                      title="Отмена"
                      onClick={e => {
                        e.stopPropagation()
                        handleCancelLocation()
                      }}
                      className="ml-2 w-6 h-6 flex items-center justify-center rounded-full text-lg text-error bg-base-200 hover:bg-error/10 transition-colors focus:outline-none border border-transparent hover:border-error"
                      style={{ lineHeight: 1 }}
                    >
                      ×
                    </button>
                  </span>
                )}
              </span>
            </button>
          </div>
        )}
        {/* Скрытые input'ы для файлов и фото */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={photoInputRef}
          onChange={e => handleFileChange(e)}
        />
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={e => handleFileChange(e)}
        />
      </div>

      {/* Эмодзи */}
      <div className="relative">
        <button
          type="button"
          className="text-2xl btn btn-ghost btn-circle ml-[-8px]"
          aria-label="Эмодзи"
          onClick={() => {
            setShowEmoji(v => !v)
            setMenuOpen(false)
          }}
          onBlur={() => setTimeout(() => setShowEmoji(false), 150)}
          tabIndex={0}
        >
          😊
        </button>
        {showEmoji && <ChatEmojiPicker onSelect={handleEmojiSelect} />}
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
        onFocus={() => {
          setMenuOpen(false)
          setShowEmoji(false)
        }}
        disabled={isFileLoading}
      />

      {/* Кнопка отправки */}
      <button
        type="submit"
        className="btn btn-primary btn-circle flex items-center justify-center"
        tabIndex={0}
        disabled={message.trim().length < 2 || isFileLoading}
      >
        <ChatIcon
          type="send"
          className={`w-7 h-7 rounded rounded-full ${message.trim().length < 2 ? "bg-none" : iconColor}`}
        />
      </button>
    </form>
  )
}
