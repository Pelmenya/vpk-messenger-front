import { TChat } from "@/entities/chat/model/types/t-chat"
import { formatChatDate } from "@/shared/lib/helpers/formatChatData";
import { FC } from "react";
import cn from "classnames";

export const ChatCard: FC<{ chat: TChat; isActive: boolean }> = ({
  chat,
  isActive,
}) => {
  return (
    <div
      className={cn(
        "h-16 w-full py-1 px-4 my-1 flex justify-between gap-2 transition cursor-pointer",
        {
          "bg-primary text-primary-content": isActive,
          "text-base-content hover:bg-primary hover:text-primary-content": !isActive,
        }
      )}
    >
      <h6 className="text-sm font-semibold max-w-[80%]  truncate">
        {chat.name}
      </h6>
      <p className="text-ex-min text-right max-w-[20%]">
        {formatChatDate(chat.createdAt)}
      </p>
    </div>
  );
};
