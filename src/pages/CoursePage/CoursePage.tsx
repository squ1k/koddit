import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AppLayout from "@/app/layout/AppLayout";
import { useUser } from "@/app/store/store";
import { courses } from "@/entities/course/model/courses";
import { modules } from "@/entities/courseModule/model/courseModules";
import { enrollments } from "@/entities/enrollment/model/enrollments";
import { courseProgress } from "@/entities/progress/model/courseProgress";
import { users } from "@/entities/user/model/users";
import Tabs from "@/shared/ui/Tabs/Tabs";
import { StatsSection } from "@/widgets/StatsContent";
import "./CoursePage.css";

const TAB_CONTENT = "content";
const TAB_STATISTICS = "statistics";

export default function CoursePage() {
    const user = useUser();
    const { courseId } = useParams<{ courseId: string }>();

    const [activeTab, setActiveTab] = useState(TAB_CONTENT);

    useEffect(() => {
        if (courseId) {
            const found = courses.find((c) => c.id === courseId);
            document.title = found ? `Курс: ${found.title}` : "Курс";
        }
    }, [courseId]);

    if (!user || !courseId) {
        return null;
    }

    const course = courses.find((c) => c.id === courseId);

    if (!course) {
        return (
            <AppLayout>
                <div className="course-page__not-found">Курс не найден</div>
            </AppLayout>
        );
    }

    const teacher = users.find((u) => u.profileId === course.teacherId);

    const courseModules = useMemo(
        () =>
            modules
                .filter((m) => m.courseId === courseId)
                .sort((a, b) => a.order - b.order),
        [courseId],
    );

    const courseEnrollment = enrollments.find(
        (e) => e.courseId === courseId && e.studentId === user.profileId,
    );

    const userProgress = courseEnrollment
        ? courseProgress.find((p) => p.enrollmentId === courseEnrollment.id)
        : undefined;

    const progressPercent = userProgress?.progress ?? 0;
    const correctPercent = userProgress?.correctPercent ?? 0;

    const tabs = [
        { label: "Содержание", value: TAB_CONTENT },
        { label: "Статистика", value: TAB_STATISTICS },
    ];

    return (
        <AppLayout>
            <div className="course-page">
                <div className="course-page__header">
                    <Link to="/profile" className="course-page__back">
                        ← Назад
                    </Link>

                    <div className="course-page__title-block">
                        <h1 className="course-page__title">{course.title}</h1>
                        <div className="course-page__meta">
                            <span>{course.lessonsCount} занятий</span>
                            <span>{courseModules.length} модулей</span>
                            <span>
                                Преподаватель:{" "}
                                {teacher
                                    ? `${teacher.firstName} ${teacher.lastName}`
                                    : "невідомо"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="course-page__tabs">
                    <Tabs
                        items={tabs}
                        value={activeTab}
                        onChange={setActiveTab}
                    />
                </div>

                {activeTab === TAB_CONTENT && (
                    <div className="course-page__section">
                        <StatsSection title="Список модулей">
                            {courseModules.length === 0 ? (
                                <div className="course-page__empty">
                                    Модули не найдены
                                </div>
                            ) : (
                                <ul className="course-modules">
                                    {courseModules.map((module) => (
                                        <li
                                            key={module.id}
                                            className="course-modules__item"
                                        >
                                            <div className="course-modules__order">
                                                {module.order}
                                            </div>
                                            <div className="course-modules__title">
                                                {module.title}
                                            </div>
                                            <div className="course-modules__status">
                                                {module.order <=
                                                (progressPercent / 100) *
                                                    courseModules.length
                                                    ? "Пройден"
                                                    : "В работе"}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </StatsSection>
                    </div>
                )}

                {activeTab === TAB_STATISTICS && (
                    <div className="course-page__section">
                        <StatsSection title="Статистика по курсу">
                            <div className="course-progress-block">
                                <div className="course-progress-info">
                                    <span>Прогресс</span>
                                    <span>{progressPercent}%</span>
                                </div>
                                <div className="course-progress-bar">
                                    <div
                                        className="course-progress-fill"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>

                            <div className="course-progress-block">
                                <div className="course-progress-info">
                                    <span>Точность решений</span>
                                    <span>{correctPercent}%</span>
                                </div>
                                <div className="course-progress-bar">
                                    <div
                                        className="course-progress-fill course-progress-fill--correct"
                                        style={{ width: `${correctPercent}%` }}
                                    />
                                </div>
                            </div>

                            {courseEnrollment ? (
                                <div className="course-course-status">
                                    Статус: {courseEnrollment.status}
                                </div>
                            ) : (
                                <div className="course-course-status course-course-status--empty">
                                    Вы не записаны на этот курс.
                                </div>
                            )}
                        </StatsSection>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
