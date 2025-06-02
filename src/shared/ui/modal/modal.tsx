import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { Fragment, JSX } from "react"
import cn from "classnames"
import { CrossIcon } from "../icons/cross-icon"

export type TModalProps = {
  title?: string
  isOpen: boolean
  handlerClose: () => void
  children?: JSX.Element
}

export const Modal = ({
  title,
  isOpen,
  handlerClose,
  children,
}: TModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handlerClose}>
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

        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center mr-1.5">
          <div className="flex min-h-full items-center justify-center px-1 sm:px-2 md:px-4 lg:px-8 text-center">
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
              <DialogPanel className="transform relative overflow-hidden rounded-3xl bg-base-100 p-2 sm:p-2 md:p-4 lg:p-8 text-left align-middle shadow-xl transition-all max-w-full max-h-full">
                <div
                  className={cn(
                    { "flex justify-between items-center gap-2": !!title },
                    { "flex flex-col items-end": !title },
                  )}
                >
                  <DialogTitle as="h3" className="text-2xl font-bold leading-6">
                    {title}
                  </DialogTitle>
                  <button
                    onClick={handlerClose}
                    className={cn(
                      "btn btn-circle btn-outline btn-sm",
                    )}
                  >
                    <CrossIcon />
                  </button>
                </div>
                <div className="mt-2">{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
