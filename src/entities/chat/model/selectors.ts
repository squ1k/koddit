import type { Chat } from "@/shared/types/chat";
import { chats } from "./chats";

export function getChatParticipants(chat: Chat) {
  return chat.participants
}

export function getChatBetweenUsers(userId1: string, userId2: string) {
  return chats.find(chat => 
    chat.participants.includes(userId1) && 
    chat.participants.includes(userId2) &&
    chat.participants.length === 2
  )
}