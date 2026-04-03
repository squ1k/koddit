import type { Chat } from "@/shared/types/chat";
import "./ChatList.css";

interface ChatListProps {
    chats: Chat[];
    selectedChatId?: string;
    onSelectChat: (chatId: string) => void;
    getUserName: (userId: string) => string;
    getCurrentUserId: string;
}

export default function ChatList({
    chats,
    selectedChatId,
    onSelectChat,
    getUserName,
    getCurrentUserId,
}: ChatListProps) {
    if (chats.length === 0) {
        return (
            <div className="chat-list">
                <div className="chat-list__empty">Нет чатов</div>
            </div>
        );
    }

    return (
        <div className="chat-list">
            <div className="chat-list__header">Чаты</div>
            <div className="chat-list__items">
                {chats.map((chat) => {
                    const otherUserId = chat.participants.find(
                        (id) => id !== getCurrentUserId,
                    );
                    const otherUserName = otherUserId
                        ? getUserName(otherUserId)
                        : "неизвестно";

                    return (
                        <button
                            key={chat.id}
                            className={`chat-list__item ${
                                selectedChatId === chat.id
                                    ? "chat-list__item--active"
                                    : ""
                            }`}
                            onClick={() => onSelectChat(chat.id)}
                        >
                            <div className="chat-list__item-content">
                                <div className="chat-list__item-name">
                                    {otherUserName}
                                </div>
                                <div className="chat-list__item-preview">
                                    {chat.lastMessage || "Новый чат"}
                                </div>
                            </div>
                            <div className="chat-list__item-time">
                                {chat.lastMessageTime
                                    ? new Date(
                                          chat.lastMessageTime,
                                      ).toLocaleString("ru-RU", {
                                          month: "short",
                                          day: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                      })
                                    : ""}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
