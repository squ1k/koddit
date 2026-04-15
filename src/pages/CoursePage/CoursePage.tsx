import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AppLayout from "@/app/layout/AppLayout";
import { useUser } from "@/app/store/store";
import { courses } from "@/entities/course/model/courses";
import { modules as allModules } from "@/entities/courseModule/model/courseModules";
import { lessons, tasks, quizzes } from "@/entities/lesson/model/lessons";
import { enrollments } from "@/entities/enrollment/model/enrollments";
import { courseProgress } from "@/entities/progress/model/courseProgress";
import { users } from "@/entities/user/model/users";
import { getChatBetweenUsers } from "@/entities/chat/model/selectors";
import Tabs from "@/shared/ui/Tabs/Tabs";
import { StatsSection } from "@/widgets/StatsContent";
import "./CoursePage.css";

const TAB_CONTENT = "content";
const TAB_STATISTICS = "statistics";

export default function CoursePage() {
    const user = useUser();
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(TAB_CONTENT);
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

    const course = courses.find((c) => c.id === courseId);

    const courseModules = useMemo(
        () =>
            courseId && course
                ? allModules
                      .filter((m) => m.courseId === courseId)
                      .sort((a, b) => a.order - b.order)
                : [],
        [courseId, course],
    );

    const moduleLessons = useMemo(() => {
        if (!selectedModuleId) return [];
        return lessons
            .filter((l) => l.moduleId === selectedModuleId)
            .sort((a, b) => a.order - b.order);
    }, [selectedModuleId]);

    const moduleTasks = useMemo(() => {
        if (!selectedModuleId) return [];
        const lessonIds = moduleLessons.map((l) => l.id);
        return tasks.filter((t) => lessonIds.includes(t.lessonId));
    }, [selectedModuleId, moduleLessons]);

    const moduleQuizzes = useMemo(() => {
        if (!selectedModuleId) return [];
        const lessonIds = moduleLessons.map((l) => l.id);
        return quizzes.filter((q) => lessonIds.includes(q.lessonId));
    }, [selectedModuleId, moduleLessons]);

    useEffect(() => {
        if (courseId) {
            const found = courses.find((c) => c.id === courseId);
            document.title = found ? `Курс: ${found.title}` : "Курс";
        }
    }, [courseId]);

    if (!user || !courseId) {
        return null;
    }

    if (!course) {
        return (
            <AppLayout>
                <div className="course-page__not-found">Курс не найден</div>
            </AppLayout>
        );
    }

    const teacher = users.find((u) => u.profileId === course.teacherId);

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

    const handleOpenChat = () => {
        if (user && teacher) {
            const chat = getChatBetweenUsers(user.id, teacher.id);
            if (chat) {
                navigate(`/chat/${chat.id}`);
            }
        }
    };

    const handleModuleClick = (moduleId: string) => {
        setSelectedModuleId(selectedModuleId === moduleId ? null : moduleId);
    };

    const handleLessonClick = (lessonId: string) => {
        navigate(`/course/${courseId}/lesson/${lessonId}`);
    };

    const handleTaskClick = (taskId: string) => {
        navigate(`/course/${courseId}/task/${taskId}`);
    };

    const handleQuizClick = (quizId: string) => {
        navigate(`/course/${courseId}/quiz/${quizId}`);
    };

    return (
        <AppLayout>
            <div className="course-page">
                <div className="course-page__header">
                    <div className="course-page__title-block">
                        <div className="course-page__title-row">
                            <h1 className="course-page__title">
                                {course.title}
                            </h1>

                            <span
                                className={`course-page__course-status ${
                                    courseEnrollment?.status === "active"
                                        ? "course-page__course-status--active"
                                        : "course-page__course-status--inactive"
                                }`}
                            >
                                {courseEnrollment
                                    ? courseEnrollment.status === "active"
                                        ? "Активный"
                                        : courseEnrollment.status
                                    : "Не записан"}
                            </span>
                        </div>

                        <div className="course-page__meta">
                            <span>{course.lessonsCount} занятий</span>
                            <span>{courseModules.length} модулей</span>
                        </div>
                        <div className="course-page__teacher-row">
                            <span className="course-page__teacher">
                                Преподаватель:{" "}
                                {teacher
                                    ? `${teacher.firstName} ${teacher.lastName}`
                                    : "неизвестно"}
                            </span>
                            <button
                                type="button"
                                onClick={handleOpenChat}
                                className="course-page__chat-btn"
                                aria-label="Чат"
                            >
                                💬 Написать
                            </button>
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
                                        <li key={module.id}>
                                            <button
                                                type="button"
                                                className={`course-modules__item ${
                                                    selectedModuleId === module.id
                                                        ? "expanded"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleModuleClick(module.id)
                                                }
                                            >
                                                <div className="course-modules__order">
                                                    {module.order}
                                                </div>
                                                <div className="course-modules__content">
                                                    <div className="course-modules__title">
                                                        {module.title}
                                                    </div>
                                                    {module.annotation && (
                                                        <div className="course-modules__annotation">
                                                            {module.annotation}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="course-modules__status">
                                                    {module.order <=
                                                    (progressPercent / 100) *
                                                        courseModules.length
                                                        ? "✓"
                                                        : ""}
                                                </div>
                                            </button>

                                            {selectedModuleId === module.id && (
                                                <div className="module-expand">
                                                    {moduleLessons.length > 0 && (
                                                        <div className="module-section">
                                                            <h4 className="module-section__title">
                                                                Уроки
                                                            </h4>
                                                            <ul className="module-lessons">
                                                                {moduleLessons.map(
                                                                    (
                                                                        lesson,
                                                                    ) => (
                                                                        <button
                                                                            type="button"
                                                                            key={
                                                                                lesson.id
                                                                            }
className={`module-lesson ${
                                                                                lesson.isCompleted
                                                                                    ? "completed"
                                                                                    : ""
                                                                            }`}
                                                                        onClick={() => handleLessonClick(lesson.id)}
                                                                    >
                                                                        <div className="module-lesson__header">
                                                                                <span className="module-lesson__title">
                                                                                    {
                                                                                        lesson.title
                                                                                    }
                                                                                </span>
                                                                                <span
                                                                                    className={`module-lesson__attendance ${
                                                                                        lesson.isCompleted
                                                                                            ? "attended"
                                                                                            : ""
                                                                                    }`}
                                                                                >
                                                                                    {lesson.isCompleted
                                                                                        ? "✓"
                                                                                        : "○"}
                                                                                </span>
                                                                            </div>
<p className="module-lesson__summary">
                                                                                 {
                                                                                     lesson.summary
                                                                                 }
                                                                             </p>
                                                                         </button>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {moduleTasks.length > 0 && (
                                                        <div className="module-section">
                                                            <h4 className="module-section__title">
                                                                Задания
                                                            </h4>
                                                            <ul className="module-tasks">
                                                                {moduleTasks.map(
                                                                    (task) => (
                                                                        <button
                                                                            type="button"
                                                                            key={
                                                                                task.id
                                                                            }
className={`module-task ${
                                                                                task.isCompleted
                                                                                    ? "completed"
                                                                                    : ""
                                                                            }`}
                                                                        onClick={() => handleTaskClick(task.id)}
                                                                        >
                                                                            <span className="module-task__checkbox">
                                                                                {task.isCompleted
                                                                                    ? "✓"
                                                                                    : "○"}
                                                                            </span>
                                                                            <span className="module-task__title">
                                                                                {
                                                                                    task.title
                                                                                }
                                                                            </span>
                                                                        </button>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {moduleQuizzes.length > 0 && (
                                                        <div className="module-section">
                                                            <h4 className="module-section__title">
                                                                Тесты
                                                            </h4>
                                                            <ul className="module-quizzes">
                                                                {moduleQuizzes.map(
                                                                    (quiz) => (
                                                                        <button
                                                                            type="button"
                                                                            key={
                                                                                quiz.id
                                                                            }
className={`module-quiz ${
                                                                                quiz.isCompleted
                                                                                    ? "completed"
                                                                                    : ""
                                                                            }`}
                                                                        onClick={() => handleQuizClick(quiz.id)}
                                                                        >
                                                                            <span className="module-quiz__title">
                                                                                {
                                                                                    quiz.title
                                                                                }
                                                                            </span>
<span className="module-quiz__info">
                                                                                 {quiz.questions.length} вопросов
                                                                             </span>
                                                                        </button>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
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