import { useState } from "react";
import type { Chat } from "@/shared/types/chat";
import { users } from "@/entities/user/model/users";
import "./ChatListDropdown.css";

interface ChatListDropdownProps {
    chats: Chat[];
    currentUserId: string;
    onSelectChat: (chatId: string) => void;
}

export default function ChatListDropdown({
    chats,
    currentUserId,
    onSelectChat,
}: ChatListDropdownProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <section className="chat-list-dropdown">
            <button
                type="button"
                className="chat-list-dropdown__toggle"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
            >
                <span className="chat-list-dropdown__title">Чаты</span>
                <span
                    className={`chat-list-dropdown__chevron ${
                        isExpanded ? "open" : ""
                    }`}
                >
                    ▾
                </span>
            </button>

            <div
                className={`chat-list-dropdown__content ${
                    isExpanded ? "open" : ""
                }`}
            >
                {chats.length === 0 ? (
                    <div className="chat-list-dropdown__empty">Нет чатов</div>
                ) : (
                    <div className="chat-list-dropdown__items">
                        {chats.map((chat) => {
                            const otherUserId = chat.participants.find(
                                (id) => id !== currentUserId,
                            );
                            const otherUser = users.find(
                                (u) => u.id === otherUserId,
                            );
                            const otherUserName = otherUser
                                ? `${otherUser.firstName} ${otherUser.lastName}`
                                : "неизвестно";

                            return (
                                <button
                                    key={chat.id}
                                    type="button"
                                    className="chat-list-dropdown__item"
                                    onClick={() => onSelectChat(chat.id)}
                                >
                                    <div className="chat-list-dropdown__item-content">
                                        <div className="chat-list-dropdown__item-name">
                                            {otherUserName}
                                        </div>
                                        <div className="chat-list-dropdown__item-preview">
                                            {chat.lastMessage || "Новый чат"}
                                        </div>
                                    </div>
                                    <div className="chat-list-dropdown__item-time">
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
                )}
            </div>
        </section>
    );
}
