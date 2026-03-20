import type { Chat } from "@/shared/types/chat";

export function getChatParticipants(chat: Chat) {
  return chat.participants
}