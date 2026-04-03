import { useState } from "react";
import type { Message } from "@/shared/types/message";
import type { User } from "@/shared/types/user";
import "./ChatView.css";

interface ChatViewProps {
    messages: Message[];
    currentUserId: string;
    otherParticipant?: User;
    onBack: () => void;
}

export default function ChatView({
    messages,
    currentUserId,
    otherParticipant,
    onBack,
}: ChatViewProps) {
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // In a real app, this would send to an API
            setNewMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="chat-view">
            <div className="chat-view__header">
                <button className="chat-view__back" onClick={onBack}>
                    ← Назад
                </button>
                <div className="chat-view__participant">
                    {otherParticipant
                        ? `${otherParticipant.firstName} ${otherParticipant.lastName}`
                        : "Чат"}
                </div>
            </div>

            <div className="chat-view__messages">
                {messages.length === 0 ? (
                    <div className="chat-view__no-messages">
                        Начните общение
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`chat-view__message ${
                                msg.senderId === currentUserId
                                    ? "chat-view__message--sent"
                                    : "chat-view__message--received"
                            }`}
                        >
                            <div className="chat-view__message-content">
                                {msg.text}
                            </div>
                            <div className="chat-view__message-time">
                                {new Date(msg.createdAt).toLocaleString(
                                    "ru-RU",
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    },
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="chat-view__input-area">
                <textarea
                    className="chat-view__input"
                    placeholder="Введите сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    rows={3}
                />
                <button
                    className="chat-view__send-btn"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                >
                    Отправить
                </button>
            </div>
        </div>
    );
}
