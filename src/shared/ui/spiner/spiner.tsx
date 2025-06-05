// Анимированный спиннер
export const Spinner = () => (
  <svg className="animate-spin w-5 h-5 text-primary" viewBox="0 0 24 24">
    <circle
      className="opacity-20"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="opacity-80"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
)
