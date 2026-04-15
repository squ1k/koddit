import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useUser } from "@/app/store/store";
import { courses } from "@/entities/course/model/courses";
import { enrollments } from "@/entities/enrollment/model/enrollments";
import { users } from "@/entities/user/model/users";
import { getParentChildrenIdsByParentId } from "@/entities/parent/model/selectors";
import AppLayout from "@/app/layout/AppLayout";
import Calendar from "@/widgets/Calendar";
import "./SchedulePage.css";

const WEEKDAY_MAP: Record<string, number> = {
    "Понедельник": 0,
    "Вторник": 1,
    "Среда": 2,
    "Четверг": 3,
    "Пятница": 4,
    "Суббота": 5,
    "Воскресенье": 6,
};

function getMondayOfWeek(reference: Date): Date {
    const d = new Date(reference.getFullYear(), reference.getMonth(), reference.getDate());
    const day = d.getDay();
    const offset = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + offset);
    return d;
}

function getLessonDateForWeek(weekMonday: Date, scheduledDay: string, time: string): Date {
    const dayOffset = WEEKDAY_MAP[scheduledDay] ?? 0;
    const date = new Date(weekMonday);
    date.setDate(weekMonday.getDate() + dayOffset);
    
    const [hours, minutes] = time.split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);
    
    return date;
}

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

    const baseDate = new Date();
    const currentWeekMonday = getMondayOfWeek(baseDate);

    const scheduleLessons = studentEnrollments.flatMap((enrollment) => {
        const course = courses.find((c) => c.id === enrollment.courseId);
        if (!course) return [];

        const lessons: {
            id: string;
            courseTitle: string;
            lessonTitle: string;
            date: Date;
        }[] = [];

        for (let weekOffset = -8; weekOffset <= 4; weekOffset++) {
            const weekMonday = new Date(currentWeekMonday);
            weekMonday.setDate(currentWeekMonday.getDate() + weekOffset * 7);

            course.schedule.forEach((scheduleItem, itemIndex) => {
                const lessonDate = getLessonDateForWeek(weekMonday, scheduleItem.day, scheduleItem.time);
                lessons.push({
                    id: `${enrollment.id}-${itemIndex}-w${weekOffset + 8}`,
                    courseTitle: course.title,
                    lessonTitle: `${scheduleItem.day}, ${scheduleItem.time}`,
                    date: lessonDate,
                });
            });
        }

        return lessons;
    }).sort((a, b) => a.date.getTime() - b.date.getTime());

    return (
        <AppLayout>
            <div className="container py-4">
                <h2 className="mb-4">
                    Расписание {studentUser.firstName} {studentUser.lastName}
                </h2>
                <Calendar lessons={scheduleLessons} />
            </div>
        </AppLayout>
    );
}