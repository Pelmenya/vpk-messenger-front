import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { Fragment } from "react"
import { CrossIcon } from "../icons/cross-icon"

type ConfirmDialogProps = {
  title?: string
  description?: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
  loading?: boolean
  error?: string
}

export const ConfirmDialog = ({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  confirmText = "Да",
  cancelText = "Нет",
  loading,
  error,
}: ConfirmDialogProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Оверлей */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-90"
          leave="ease-in duration-100"
          leaveFrom="opacity-90"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-base-300" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
          <div className="flex min-h-full items-center justify-center px-2 text-center">
            {/* Модальное окно */}
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className="transform relative overflow-hidden rounded-3xl bg-base-100 p-4 sm:p-6 text-left align-middle shadow-xl transition-all min-w-[320px] max-w-[90vw] w-full"
              >
                <div className="flex justify-between items-center mb-2">
                  <DialogTitle as="h3" className="text-2xl font-bold leading-6">
                    {title}
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    className="btn btn-circle btn-outline btn-sm"
                  >
                    <CrossIcon />
                  </button>
                </div>
                {description && (
                  <div className="mb-4 text-base max-w-md">{description}</div>
                )}
                {error && (
                  <div className="alert alert-error my-2 py-2 text-sm">
                    {error}
                  </div>
                )}
                <div className="modal-action mt-4 flex justify-end gap-2">
                  <button
                    className="btn"
                    onClick={onClose}
                    disabled={loading}
                  >
                    {cancelText}
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={onConfirm}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Удаление...
                      </>
                    ) : (
                      confirmText
                    )}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
