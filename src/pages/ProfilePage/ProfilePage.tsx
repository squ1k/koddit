import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { setPageTitle, useUser } from "@/app/store/store";
import { getWelcomeData } from "@/widgets/GreetingCard/model/selectors";
import { students } from "@/entities/student/model/students";
import { courses } from "@/entities/course/model/courses";
import { enrollments } from "@/entities/enrollment/model/enrollments";
import { getUserChats } from "@/shared/api/chatApi";
import ChatListDropdown from "./ui/ChatListDropdown";

import AppLayout from "@/app/layout/AppLayout";
import GreetingCard from "@/widgets/GreetingCard/ui/GreetingCard";
import CourseList from "@/widgets/CourseList/ui";
import Calendar from "@/widgets/Calendar";
import PaymentCard from "@/widgets/PaymentCard";
import AdminPage from "@/pages/AdminPage";
import "./ProfilePage.css";

function StudentProfilePage() {
    useEffect(() => {
        setPageTitle("Личный кабинет");
    }, []);

    const user = useUser();
    const navigate = useNavigate();

    const userChats = useMemo(() => {
        if (!user) return [];
        return getUserChats(user.id);
    }, [user]);

    const currentStudent = useMemo(
        () =>
            user ? students.find((s) => s.id === user.profileId) : undefined,
        [user],
    );

    const studentEnrollments = useMemo(
        () =>
            currentStudent
                ? enrollments.filter((e) => e.studentId === currentStudent.id)
                : [],
        [currentStudent],
    );

    const activeEnrollments = useMemo(
        () =>
            studentEnrollments.filter(
                (enrollment) => enrollment.status === "active",
            ),
        [studentEnrollments],
    );

    const paidCoursesCount = useMemo(
        () =>
            studentEnrollments.filter((enrollment) => enrollment.paid !== false)
                .length,
        [studentEnrollments],
    );

    const unpaidCoursesCount = useMemo(
        () =>
            studentEnrollments.filter((enrollment) => enrollment.paid === false)
                .length,
        [studentEnrollments],
    );

    const scheduleLessons = useMemo(() => {
        const dayIndexMap: Record<string, number> = {
            Понедельник: 1,
            Вторник: 2,
            Среда: 3,
            Четверг: 4,
            Пятница: 5,
            Суббота: 6,
            Воскресенье: 0,
        };

        const today = new Date();
        const currentDay = today.getDay();

        const getNextDateForWeekday = (weekday: string) => {
            const targetDay = dayIndexMap[weekday];
            if (targetDay === undefined) {
                return new Date(today);
            }

            const delta = (targetDay - currentDay + 7) % 7;
            const result = new Date(today);
            result.setDate(today.getDate() + (delta === 0 ? 0 : delta));
            return result;
        };

        return activeEnrollments
            .flatMap((enrollment) => {
                const course = courses.find(
                    (c) => c.id === enrollment.courseId,
                );
                if (!course) return [];

                return course.schedule.map((scheduleItem, index) => ({
                    id: `${enrollment.id}-${index}`,
                    courseTitle: course.title,
                    lessonTitle: `${scheduleItem.day}, ${scheduleItem.time}`,
                    date: getNextDateForWeekday(scheduleItem.day),
                }));
            })
            .sort((a, b) => a.date.getTime() - b.date.getTime());
    }, [activeEnrollments]);

    if (!user) {
        return null;
    }

    const welcomeData = getWelcomeData(user);
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
                        <Calendar lessons={scheduleLessons} />
                        <PaymentCard
                            balance={balance}
                            paidCoursesCount={paidCoursesCount}
                            unpaidCoursesCount={unpaidCoursesCount}
                        />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

export default function ProfilePage() {
    const user = useUser();

    if (!user) {
        return null;
    }

    if (user.role === "Администратор") {
        return <AdminPage />;
    }

    return <StudentProfilePage />;
}
