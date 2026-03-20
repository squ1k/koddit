import { chats } from "@/entities/chat/model/chats"

export function getUserChats(userId: string) {
  return chats.filter(chat =>
    chat.participants.includes(userId)
  )
}