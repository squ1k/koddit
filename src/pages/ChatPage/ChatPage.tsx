import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AppLayout from "@/app/layout/AppLayout";
import { useUser, setPageTitle } from "@/app/store/store";
import type { User } from "@/shared/types/user";
import { chats } from "@/entities/chat/model/chats";
import { messages } from "@/entities/message/model/messages";
import { users } from "@/entities/user/model/users";
import ChatList from "./ui/ChatList";
import ChatView from "./ui/ChatView";
import "./ChatPage.css";

export default function ChatPage() {
    const user = useUser();
    const { chatId } = useParams<{ chatId?: string }>();
    const navigate = useNavigate();
    const [selectedChatId, setSelectedChatId] = useState<string | undefined>(
        chatId,
    );

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
        setPageTitle("Чат");
        document.title = "Чат";
        window.scrollTo(0, 0);
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    const userChats = chats.filter((chat) =>
        chat.participants.includes(user.id),
    );

    const handleSelectChat = (id: string) => {
        setSelectedChatId(id);
        navigate(`/chat/${id}`);
    };

    const handleBackToList = () => {
        setSelectedChatId(undefined);
        navigate("/chat");
    };

    const selectedChat = selectedChatId
        ? chats.find((c) => c.id === selectedChatId)
        : undefined;

    const chatMessages = selectedChat
        ? messages.filter((m) => m.chatId === selectedChat.id)
        : [];

    const getOtherParticipant = (chat: (typeof chats)[0]): User | undefined => {
        const otherUserId = chat.participants.find((id) => id !== user.id);
        return users.find((u) => u.id === otherUserId) as User | undefined;
    };

    return (
        <AppLayout>
            <div className="chat-page">
                <div className="chat-page__container">
                    <ChatList
                        chats={userChats}
                        selectedChatId={selectedChatId}
                        onSelectChat={handleSelectChat}
                        getUserName={(userId) => {
                            const u = users.find((usr) => usr.id === userId);
                            return u
                                ? `${u.firstName} ${u.lastName}`
                                : "неизвестно";
                        }}
                        getCurrentUserId={user.id}
                    />

                    {selectedChat ? (
                        <ChatView
                            messages={chatMessages}
                            currentUserId={user.id}
                            otherParticipant={getOtherParticipant(selectedChat)}
                            onBack={handleBackToList}
                        />
                    ) : (
                        <div className="chat-page__empty">
                            <div className="chat-page__no-selection">
                                Выберите чат для начала общения
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
