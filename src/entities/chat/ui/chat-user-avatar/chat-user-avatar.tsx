import { TUser } from "@/entities/user/model/user.entity"
import { FC } from "react"

export const ChatUserAvatar: FC<Partial<TUser> & {size?: string}> = ({
  displayName,
  profileImageUrl,
  size = "w-10 h-10",
}) => {
  const initials = displayName
    ? displayName
        .split(" ")
        .map(w => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?"

  return (
    <div className={`avatar ${size}`}>
      {profileImageUrl ? (
        <div className={`${size} rounded-full overflow-hidden flex items-center justify-center bg-base-200`}>
          <img
            src={import.meta.env.VITE_BACKEND_BASE_IMAGES_URL + profileImageUrl}
            alt={displayName}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className={`${size} rounded-full flex items-center justify-center bg-primary text-primary-content text-lg font-semibold`}>
          {initials}
        </div>
      )}
    </div>
  )
}


type TChatHeaderProps = {
  displayName: string
  position?: string | null
  createdAt: string
}

export const ChatHeader: FC<TChatHeaderProps> = ({
  displayName,
  position,
  createdAt,
}) => (
  <div className="chat-header flex flex-col items-start gap-0.5">
    <span className="font-semibold">{displayName}</span>
    {position && (
      <span className="text-xs text-base-content/60">{position}</span>
      // или <span className="badge badge-ghost text-xs">{position}</span>
    )}
    <time className="text-xs opacity-50">
      {new Date(createdAt).toLocaleString()}
    </time>
  </div>
)
