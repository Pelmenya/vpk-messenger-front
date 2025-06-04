import { PaperclipIcon } from "@/shared/ui/icons/paper-clip-icon"
import React, { useRef, useState } from "react"
import { ChatIcon } from "../chat-icon/chat-icon"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { getSelectedChatId } from "@/entities/chat/model/chat-selectors"
import { getToken } from "@/features/auth/model/auth-selectors"
import {
  useSendFileMessageMutation,
} from "@/entities/message/api/message-api" // исправьте путь, если другой

// Для текстовых сообщений используем signalR middleware через dispatch
export const ChatSendForm = ({
  iconColor = "text-primary",
}: {
  iconColor?: string
}) => {
  const dispatch = useAppDispatch();
  const chatId = useAppSelector(getSelectedChatId)
  const token = useAppSelector(getToken)

  const [message, setMessage] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [sendFileMessage, { isLoading: isFileLoading }] = useSendFileMessageMutation()

  // Открытие input'а для фото
  const handlePhotoClick = () => {
    photoInputRef.current?.click();
    setMenuOpen(false);
  }

  // Открытие input'а для файлов
  const handleFileClick = () => {
    fileInputRef.current?.click();
    setMenuOpen(false);
  }

  // Отправка файла или фото
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!chatId || !token) return;

    try {
      await sendFileMessage({
        chatId,
        file,
        authKey: token,
      }).unwrap();
      // Новое сообщение с файлом придет по SignalR автоматически!
    } catch (e) {
      alert("Ошибка загрузки файла");
    }
    e.target.value = ""; // сброс input, чтобы можно было снова выбрать тот же файл
  };

  // Отправка текстового сообщения через SignalR middleware
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length < 2) return;
    if (!chatId || !token) return;

    // Используем Redux action для SignalR
    dispatch({
      type: "chat/sendMessage",
      payload: {
        chatId,
        message:  message.trim(),
      }
    });

    setMessage("");
    inputRef.current?.focus();
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
            cursor-pointer
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
              onClick={handlePhotoClick}
              disabled={isFileLoading}
            >
              <ChatIcon type="photo" className={`w-6 h-6 mr-3 ${iconColor}`} />
              <span className="text-base-content">Фото</span>
            </button>
            <button
              type="button"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-base-200 mb-2"
              onClick={handleFileClick}
              disabled={isFileLoading}
            >
              <ChatIcon type="file" className={`w-6 h-6 mr-3 ${iconColor}`} />
              <span className="text-base-content">Файл</span>
            </button>
            <button
              type="button"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-base-200"
              disabled
            >
              <ChatIcon
                type="location"
                className={`w-6 h-6 mr-3 ${iconColor}`}
              />
              <span className="text-base-content">Локация</span>
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
