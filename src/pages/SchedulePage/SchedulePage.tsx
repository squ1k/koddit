import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useUser } from "@/app/store/store";
import { courses } from "@/entities/course/model/courses";
import { enrollments } from "@/entities/enrollment/model/enrollments";
import { users } from "@/entities/user/model/users";
import { getParentChildrenIdsByParentId } from "@/entities/parent/model/selectors";
import AppLayout from "@/app/layout/AppLayout";
import Calendar from "@/widgets/Calendar";
import "./SchedulePage.css";

export default function SchedulePage() {
    const user = useUser();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        document.title = "Расписание";
    }, []);

    if (!user) {
        return null;
    }

    const studentId = searchParams.get("studentId") || user.profileId;

    // Check permissions
    if (studentId !== user.profileId) {
        if (user.role === "Родитель") {
            const childrenIds = getParentChildrenIdsByParentId(user.profileId);
            if (!childrenIds.includes(studentId)) {
                return <div>Доступ запрещен</div>;
            }
        } else {
            return <div>Доступ запрещен</div>;
        }
    }

    const studentUser = users.find(
        (u) => u.profileId === studentId && u.role === "Ученик",
    );

    if (!studentUser) {
        return <div>Студент не найден</div>;
    }

    const studentEnrollments = enrollments.filter(
        (e) => e.studentId === studentId && e.status === "active",
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

        return studentEnrollments
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
    }, [studentEnrollments]);

    return (
        <AppLayout>
            <div className="schedule-page">
                <h2>
                    Расписание {studentUser.firstName} {studentUser.lastName}
                </h2>
                <Calendar lessons={scheduleLessons} />
            </div>
        </AppLayout>
    );
}
