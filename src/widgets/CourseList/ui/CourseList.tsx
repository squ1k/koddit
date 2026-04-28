import { useMemo, useState } from "react";

import { getCourseItems } from "@/widgets/CourseList/model/selectors";
import CourseCard from "@/widgets/CourseCard";

import "./CourseList.css";

type Props = {
    userId: string;
    role: "Ученик" | "Учитель" | "Родитель" | "Администратор";
    status?: "active" | "completed";
    title?: string;
    upcoming?: boolean;
};

export default function CourseList({
    userId,
    role,
    status = "active",
    title,
    upcoming = false,
}: Props) {
    const [isExpanded, setIsExpanded] = useState(true);

    const courses = useMemo(() => {
        if (upcoming) {
            return getUpcomingCourseItems(role, userId);
        }

        return getCourseItems(role, userId, status);
    }, [role, userId, status, upcoming]);

    const headerLabel =
        title ?? (status === "active" ? "Мои курсы" : "Завершённые курсы");

    return (
        <section className="course-list">
            <button
                type="button"
                className="course-list__toggle"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
            >
                <span className="course-list__title">{headerLabel}</span>
                <span
                    className={`course-list__chevron ${isExpanded ? "open" : ""}`}
                >
                    ▾
                </span>
            </button>

            <div className={`course-list__content ${isExpanded ? "open" : ""}`}>
                {courses.length === 0 ? (
                    <div className="course-list__empty">
                        Нет {status === "active" ? "активных" : "завершённых"}{" "}
                        курсов
                    </div>
                ) : (
                    courses.map((course) => (
                        <CourseCard
                            key={course.courseId}
                            course={course}
                            hideProgress={role === "Учитель"}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
