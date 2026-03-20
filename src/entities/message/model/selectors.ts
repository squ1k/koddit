import type { Message } from "@/shared/types/message"

export function getMessageText(message: Message) {
  return message.text
}

export function getMessageSender(message: Message) {
  return message.senderId
}