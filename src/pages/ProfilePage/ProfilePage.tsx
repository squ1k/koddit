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
import ChildrenList from "@/widgets/ChildrenList";
import StatsOverview from "@/widgets/StatsOverview/ui/StatsOverview";
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

    const scheduleLessons = useMemo(() => {
        const WEEKDAY_MAP: Record<string, number> = {
            Понедельник: 0,
            Вторник: 1,
            Среда: 2,
            Четверг: 3,
            Пятница: 4,
            Суббота: 5,
            Воскресенье: 6,
        };

        function getMondayOfWeek(reference: Date, weeksOffset: number): Date {
            const date = new Date(reference);
            const dayOfWeek = date.getDay();
            const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
            date.setDate(date.getDate() + diff + weeksOffset * 7);
            date.setHours(0, 0, 0, 0);
            return date;
        }

        const today = new Date();
        const currentWeekMonday = getMondayOfWeek(today, 0);

        return activeEnrollments
            .flatMap((enrollment) => {
                const course = courses.find(
                    (c) => c.id === enrollment.courseId,
                );
                if (!course) return [];

                const allLessons: {
                    id: string;
                    courseTitle: string;
                    lessonTitle: string;
                    date: Date;
                }[] = [];

                for (let weekOffset = -8; weekOffset <= 4; weekOffset++) {
                    const monday = new Date(currentWeekMonday);
                    monday.setDate(
                        currentWeekMonday.getDate() + weekOffset * 7,
                    );

                    course.schedule.forEach((scheduleItem, scheduleIndex) => {
                        const dayOffset = WEEKDAY_MAP[scheduleItem.day] ?? 0;
                        const lessonDate = new Date(monday);
                        lessonDate.setDate(monday.getDate() + dayOffset);

                        const [hours, minutes] = scheduleItem.time
                            .split(":")
                            .map(Number);
                        lessonDate.setHours(hours, minutes, 0, 0);

                        allLessons.push({
                            id: `${enrollment.id}-${scheduleIndex}-w${weekOffset + 8}`,
                            courseTitle: course.title,
                            lessonTitle: `${scheduleItem.day}, ${scheduleItem.time}`,
                            date: lessonDate,
                        });
                    });
                }

                return allLessons;
            })
            .sort((a, b) => a.date.getTime() - b.date.getTime());
    }, [activeEnrollments]);

    if (!user) {
        return null;
    }

    const welcomeData = getWelcomeData(user);

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

                    {user.role === "Учитель" && (
                        <div className="profile-page__actions">
                            <button
                                type="button"
                                className="profile-page__create-course-btn"
                                onClick={() => navigate("/course/create")}
                            >
                                Создать курс
                            </button>
                        </div>
                    )}

                    {user.role === "Учитель" && (
                        <CourseList
                            userId={user.profileId}
                            role={user.role}
                            title="Предстоящие курсы"
                            upcoming
                        />
                    )}

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

                    {user.role === "Ученик" && (
                        <>
                            <Calendar lessons={scheduleLessons} />
                            <PaymentCard enrollments={studentEnrollments} />
                            <StatsOverview
                                studentId={currentStudent?.id || ""}
                            />
                        </>
                    )}

                    {user.role === "Родитель" && (
                        <ChildrenList
                            childrenIds={welcomeData.childrenIds || []}
                        />
                    )}
                </div>
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
