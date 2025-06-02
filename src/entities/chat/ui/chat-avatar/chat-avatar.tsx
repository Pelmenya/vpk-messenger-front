import { FC } from "react"

export const ChatAvatar: FC<{ name?: string; imageUrl?: string; size?: string }> = ({
  name,
  imageUrl,
  size = "w-10 h-10",
}) => {
  const initials = name
    ? name
        .split(" ")
        .map(w => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "Ч"

  return imageUrl ? (
    <div className={`avatar ${size}`}>
      <div className={`${size} rounded-full overflow-hidden flex items-center justify-center bg-base-200`}>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  ) : (
    <div className={`${size} rounded-full flex items-center justify-center bg-primary text-primary-content text-lg font-semibold`}>
      <span>{initials}</span>
    </div>
  )
}