import { TUser } from "@/entities/user/model/user.entity"

export type TMessage = {
  messageId: number
  content: string
  createdAt: string
  messageImageUrl: string | null
  messageFileUrl: string | null
  messageFileName: string | null
  user: TUser
}