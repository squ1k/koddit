import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { setPageTitle, useUser } from "@/app/store/store";
import { getWelcomeData } from "@/widgets/GreetingCard/model/selectors";
import { students } from "@/entities/student/model/students";
import { getUserChats } from "@/shared/api/chatApi";
import ChatListDropdown from "./ui/ChatListDropdown";

import AppLayout from "@/app/layout/AppLayout";
import GreetingCard from "@/widgets/GreetingCard/ui/GreetingCard";
import CourseList from "@/widgets/CourseList/ui";
import Calendar from "@/widgets/Calendar";
import PaymentCard from "@/widgets/PaymentCard";
import "./ProfilePage.css";

export default function StudentProfilePage() {
    useEffect(() => {
        setPageTitle("Личный кабинет");
    }, []);

    const user = useUser();
    const navigate = useNavigate();

    const userChats = useMemo(() => {
        if (!user) return [];
        return getUserChats(user.id);
    }, [user]);

    if (!user) {
        return null;
    }

    const welcomeData = getWelcomeData(user);

    const currentStudent = students.find((s) => s.id === user.profileId);
    const balance = currentStudent?.balance ?? 0;

    return (
        <AppLayout>
            <div className="profile-page">
                <div className="profile-main">
                    <GreetingCard
                        name={user.firstName}
                        role={user.role}
                        activeCourses={welcomeData.activeCourses}
                        nextLesson={welcomeData.nextLesson}
                        childrenIds={welcomeData.childrenIds}
                    />

                    {(user.role === "Ученик" || user.role === "Учитель") && (
                        <>
                            <CourseList
                                userId={user.profileId}
                                role={user.role}
                            />
                            <CourseList
                                userId={user.profileId}
                                role={user.role}
                                status="completed"
                            />
                            <ChatListDropdown
                                chats={userChats}
                                currentUserId={user.id}
                                onSelectChat={(chatId) =>
                                    navigate(`/chat/${chatId}`)
                                }
                            />
                        </>
                    )}
                </div>

                {user.role === "Ученик" && (
                    <div className="profile-sidebar">
                        <Calendar lessons={[]} />
                        <PaymentCard balance={balance} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
