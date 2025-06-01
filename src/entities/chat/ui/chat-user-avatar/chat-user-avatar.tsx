import { TUser } from "@/entities/user/model/user.entity"
import { setBaseImageUrl } from "@/shared/lib/helpers/set-base-image-url"
import { FC } from "react"

export const ChatUserAvatar: FC<Partial<TUser> & { size?: string }> = ({
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
    <>
      {profileImageUrl ? (
        <div className={`avatar ${size}`}>
          <div
            className={`${size} rounded-full overflow-hidden flex items-center justify-center bg-base-200`}
          >
            <img
              src={
                setBaseImageUrl(profileImageUrl)
              }
              alt={displayName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ) : (
        <div
          className={`${size} rounded-full flex items-center justify-center bg-primary text-primary-content text-lg font-semibold`}
        >
          <p>{initials}</p>
        </div>
      )}
    </>
  )
}
