import { messages } from "@/entities/message/model/messages"

export function getMessagesByChat(chatId: string) {
  return messages.filter(m => m.chatId === chatId)
}