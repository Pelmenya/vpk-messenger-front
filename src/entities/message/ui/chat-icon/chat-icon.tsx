type ChatIconType = "add" | "photo" | "file" | "location" | "send"

export const ChatIcon = ({
  type,
  className = "",
}: {
  type: ChatIconType
  className?: string
}) => {
  switch (type) {
    case "add":
      return (
        <svg
          width={22}
          height={22}
          viewBox="0 0 22 22"
          fill="none"
          className={className}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 1.5H18C19.3807 1.5 20.5 2.61929 20.5 4V12H16C13.7909 12 12 13.7909 12 16V20.5H4C2.61929 20.5 1.5 19.3807 1.5 18V4C1.5 2.61929 2.61929 1.5 4 1.5ZM12 22H4C1.79086 22 0 20.2091 0 18V4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V12V18C22 20.2091 20.2091 22 18 22H12Z"
            fill="currentColor"
          />
        </svg>
      )
    case "photo":
      return (
        <svg
          width={22}
          height={22}
          viewBox="0 0 22 22"
          fill="none"
          className={className}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 1.5H18C19.3807 1.5 20.5 2.61929 20.5 4V14L14.5194 12.4052C13.5108 12.1362 12.4714 12 11.4275 12H10.5725C9.52864 12 8.48921 12.1362 7.48057 12.4052L1.5 14V4C1.5 2.61929 2.61929 1.5 4 1.5ZM0 4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V18C22 20.2091 20.2091 22 18 22H4C1.79086 22 0 20.2091 0 18V4ZM8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6Z"
            fill="currentColor"
          />
        </svg>
      )
    case "file":
      return (
        <svg
          width={22}
          height={22}
          viewBox="0 0 22 22"
          fill="none"
          className={className}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 1.5H18C19.3807 1.5 20.5 2.61929 20.5 4V12H16C13.7909 12 12 13.7909 12 16V20.5H4C2.61929 20.5 1.5 19.3807 1.5 18V4C1.5 2.61929 2.61929 1.5 4 1.5ZM12 22H4C1.79086 22 0 20.2091 0 18V4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V12V18C22 20.2091 20.2091 22 18 22H12Z"
            fill="currentColor"
          />
        </svg>
      )
    case "location":
      return (
        <svg
          width={22}
          height={22}
          viewBox="0 0 22 22"
          fill="none"
          className={className}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.5 11C20.5 16.2467 16.2467 20.5 11 20.5C5.75329 20.5 1.5 16.2467 1.5 11C1.5 5.75329 5.75329 1.5 11 1.5C16.2467 1.5 20.5 5.75329 20.5 11ZM22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z"
            fill="currentColor"
          />
        </svg>
      )
    case "send":
      return (
        <svg
          width={28}
          height={28}
          viewBox="0 0 28 28"
          fill="none"
          className={className}
        >
          <rect x={8} y={13.2} width={11} height={1.6} fill="var(--color-base-100)" />
          <path d="M15 9L19 14L15 19" stroke="var(--color-base-100)" strokeWidth={1.6} />
        </svg>
      )
    default:
      return null
  }
}
