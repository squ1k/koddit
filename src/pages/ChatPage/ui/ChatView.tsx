import { useState, useRef, useEffect, useMemo } from "react";
import type { Message } from "@/shared/types/message";
import type { User } from "@/shared/types/user";
import { addSessionMessage } from "@/app/store/store";
import "./ChatView.css";

interface ChatViewProps {
    messages: Message[];
    currentUserId: string;
    otherParticipant?: User;
    onBack: () => void;
    onMessageSent?: () => void;
    chatId?: string;
}

function formatDateHeader(dateStr: string): string {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return "Сегодня";
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "Вчера";
    } else {
        return date.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }
}

function isSameDay(date1: string, date2: string): boolean {
    return new Date(date1).toDateString() === new Date(date2).toDateString();
}

export default function ChatView({
    messages,
    currentUserId,
    otherParticipant,
    onBack,
    onMessageSent,
    chatId,
}: ChatViewProps) {
    const [newMessage, setNewMessage] = useState("");
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [visibleDate, setVisibleDate] = useState<string | null>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<number | null>(null);

    const sortedMessages = useMemo(() => {
        return [...messages].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
    }, [messages]);

    const processedMessages = useMemo(() => {
        const result: { type: "date" | "message"; data: string | Message }[] = [];
        
        sortedMessages.forEach((msg, index) => {
            if (index === 0) {
                result.push({ type: "date", data: msg.createdAt });
            } else {
                const prevMsg = sortedMessages[index - 1];
                if (!isSameDay(prevMsg.createdAt, msg.createdAt)) {
                    result.push({ type: "date", data: msg.createdAt });
                }
            }
            result.push({ type: "message", data: msg });
        });
        
        return result;
    }, [sortedMessages]);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            setIsScrolling(true);
            
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            
            scrollTimeoutRef.current = window.setTimeout(() => {
                setIsScrolling(false);
            }, 1000);

            const firstVisibleMsg = Array.from(container.querySelectorAll(".chat-view__message")).find((el) => {
                const rect = el.getBoundingClientRect();
                return rect.top >= 0;
            }) as HTMLElement | undefined;

            if (firstVisibleMsg) {
                const dateDiv = container.querySelector(".date-divider--sticky");
                if (dateDiv) {
                    const dateText = dateDiv.getAttribute("data-date");
                    setVisibleDate(dateText);
                }
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => {
            container.removeEventListener("scroll", handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages.length]);

    const handleSendMessage = () => {
        if (newMessage.trim() && chatId) {
            const message: Message = {
                id: `msg-${Date.now()}`,
                chatId: chatId,
                senderId: currentUserId,
                text: newMessage.trim(),
                createdAt: new Date().toISOString(),
            };
            addSessionMessage(message);
            setNewMessage("");
            onMessageSent?.();
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

            <div className="chat-view__messages" ref={messagesContainerRef}>
                {processedMessages.length === 0 ? (
                    <div className="chat-view__no-messages">
                        Начните общение
                    </div>
                ) : (
                    <>
                        {visibleDate && isScrolling && (
                            <div className="date-divider date-divider--sticky" data-date={visibleDate}>
                                {formatDateHeader(visibleDate)}
                            </div>
                        )}
                        {processedMessages.map((item, index) => {
                            if (item.type === "date") {
                                return (
                                    <div
                                        key={`date-${index}`}
                                        className={`date-divider ${!isScrolling ? "" : "date-divider--hidden"}`}
                                    >
                                        {formatDateHeader(item.data as string)}
                                    </div>
                                );
                            } else {
                                const msg = item.data as Message;
                                return (
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
                                );
                            }
                        })}
                    </>
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