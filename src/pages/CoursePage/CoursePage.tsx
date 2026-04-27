import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AppLayout from "@/app/layout/AppLayout";
import { useUser, getAllQuizResults, getAllViewedContent } from "@/app/store/store";
import { courses } from "@/entities/course/model/courses";
import { modules as allModules } from "@/entities/courseModule/model/courseModules";
import { lessons, tasks, quizzes } from "@/entities/lesson/model/lessons";
import { enrollments } from "@/entities/enrollment/model/enrollments";
import { courseProgress } from "@/entities/progress/model/courseProgress";
import { users } from "@/entities/user/model/users";
import { getChatBetweenUsers } from "@/entities/chat/model/selectors";
import { isLessonAttended, getAttendanceForCourse } from "@/entities/attendance/model/attendance";
import Tabs from "@/shared/ui/Tabs/Tabs";
import { StatsSection } from "@/widgets/StatsContent";
import "./CoursePage.css";

const TAB_CONTENT = "content";
const TAB_STATISTICS = "statistics";
const TAB_SCHEDULE = "schedule";

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function formatDate(date: Date): string {
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}

interface LessonWithDate {
    lessonId: string;
    id?: string;
    title: string;
    moduleId: string;
    moduleTitle: string;
    date: Date;
    isPast: boolean;
    isCompleted: boolean;
    attended?: boolean;
}

export default function CoursePage() {
    const user = useUser();
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(TAB_CONTENT);
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
    const [quizResults, setQuizResults] = useState<Record<string, { correctCount: string; total: string }>>({});
    const [viewedContent, setViewedContent] = useState<Record<string, boolean>>({});
    const [expandedScheduleModules, setExpandedScheduleModules] = useState<Set<string>>(new Set());

    useEffect(() => {
        setQuizResults(getAllQuizResults());
        setViewedContent(getAllViewedContent());
    }, [selectedModuleId, activeTab]);

    const toggleScheduleModule = (moduleId: string) => {
        setExpandedScheduleModules(prev => {
            const newSet = new Set(prev);
            if (newSet.has(moduleId)) {
                newSet.delete(moduleId);
            } else {
                newSet.add(moduleId);
            }
            return newSet;
        });
    };

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

    const courseQuizzes = useMemo(() => {
        return quizzes.filter((q) => {
            const relatedLesson = lessons.find((l) => l.id === q.lessonId);
            return relatedLesson && courseModules.some((m) => m.id === relatedLesson.moduleId);
        });
    }, [courseModules]);

    const completedQuizzes = useMemo(() => {
        return courseQuizzes.filter((q) => quizResults[q.id]).length;
    }, [courseQuizzes, quizResults]);

    const totalCorrectAnswers = useMemo(() => {
        return courseQuizzes.reduce((sum, q) => {
            const result = quizResults[q.id];
            if (result) {
                return sum + parseInt(result.correctCount, 10);
            }
            return sum;
        }, 0);
    }, [courseQuizzes, quizResults]);

    const totalQuizQuestions = useMemo(() => {
        return courseQuizzes.reduce((sum, q) => sum + q.questions.length, 0);
    }, [courseQuizzes]);

    const baseProgress = userProgress?.progress ?? 0;
    const baseCorrect = userProgress?.correctPercent ?? 0;

    const quizProgressPercent = courseQuizzes.length > 0 
        ? Math.round((completedQuizzes / courseQuizzes.length) * 100) 
        : 0;
    const quizCorrectPercent = totalQuizQuestions > 0 
        ? Math.round((totalCorrectAnswers / totalQuizQuestions) * 100) 
        : 0;

    const progressPercent = completedQuizzes > 0 
        ? Math.round((baseProgress * (100 - quizProgressPercent) / 100) + quizProgressPercent)
        : baseProgress;
    const correctPercent = completedQuizzes > 0
        ? Math.round((baseCorrect * (100 - quizCorrectPercent) / 100) + quizCorrectPercent)
        : baseCorrect;

    const tabs = [
        { label: "Содержание", value: TAB_CONTENT },
        { label: "Статистика", value: TAB_STATISTICS },
        { label: "Расписание", value: TAB_SCHEDULE },
];
    const courseStartDate = course.startDate ? new Date(course.startDate) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const scheduledLessons = useMemo(() => {
        if (!courseStartDate || !course.schedule || course.schedule.length === 0) {
            return [];
        }

        const result: LessonWithDate[] = [];
        let currentDate = new Date(courseStartDate);
        const endDate = addDays(today, 60);
        const lessonsPerModule = Math.ceil(course.lessonsCount / courseModules.length);
        
        let lessonNumber = 0;

        while (currentDate <= endDate && result.length < course.lessonsCount) {
            const dayName = currentDate.toLocaleDateString("ru-RU", { weekday: "long" });
            const dayMap: Record<string, string> = {
                "понедельник": "Понедельник",
                "вторник": "Вторник",
                "среда": "Среда",
                "четверг": "Четверг",
                "пятница": "Пятница",
                "суббота": "Суббота",
                "воскресенье": "Воскресенье",
            };
            const normalizedDay = dayMap[dayName.toLowerCase()] || dayName;
            
            const scheduleSlot = course.schedule.find(s => s.day === normalizedDay);
            if (scheduleSlot) {
                const [hours, minutes] = scheduleSlot.time.split(":").map(Number);
                const lessonDate = new Date(currentDate);
                lessonDate.setHours(hours, minutes, 0, 0);

                lessonNumber++;
                const moduleIndex = Math.floor((lessonNumber - 1) / lessonsPerModule);
                const module = courseModules[moduleIndex] || courseModules[0];
                
                result.push({
                    lessonId: `l${lessonNumber}`,
                    id: `l${lessonNumber}`,
                    title: `Урок ${lessonNumber}`,
                    moduleId: module.id,
                    moduleTitle: module.title || "Модуль",
                    date: lessonDate,
                    isPast: lessonDate < today,
                    isCompleted: false,
                });
            }
            currentDate = addDays(currentDate, 1);
        }

        return result;
    }, [course, courseStartDate, courseModules]);

    const courseAttendance = user?.profileId ? getAttendanceForCourse(courseId || "", user.profileId) : [];
    const pastScheduledLessons = scheduledLessons.filter(l => l.isPast);
    const scheduledLessonTitles = new Set(pastScheduledLessons.map(l => l.title));
    const attendedLessons = courseAttendance.filter(a => 
        scheduledLessonTitles.has(a.lessonId) && a.attended
    ).length;
    const totalScheduledLessons = pastScheduledLessons.length;
    const attendancePercent = totalScheduledLessons > 0 
        ? Math.round((attendedLessons / totalScheduledLessons) * 100) 
        : 0;
    
    const HOURS_PER_LESSON = 1.5;
    const totalHoursSpent = Math.round(attendedLessons * HOURS_PER_LESSON * 10) / 10;

    const modulesStats = useMemo(() => {
        return courseModules.map(module => {
            const moduleLessons = scheduledLessons.filter(l => l.moduleId === module.id);
            const pastModuleLessons = moduleLessons.filter(l => l.isPast);
            const pastModuleLessonTitles = new Set(pastModuleLessons.map(l => l.title));
            const moduleAttendance = courseAttendance.filter(a => 
                pastModuleLessonTitles.has(a.lessonId)
            );
            const moduleAttended = moduleAttendance.filter(a => a.attended).length;
            const moduleAttendancePercent = pastModuleLessons.length > 0 
                ? Math.round((moduleAttended / pastModuleLessons.length) * 100)
                : 0;
            
            const moduleLessonIds = moduleLessons.map(l => l.lessonId);
            const moduleQuizzes = courseQuizzes.filter(q => {
                const relatedLesson = lessons.find(l => l.id === q.lessonId);
                return relatedLesson && moduleLessonIds.includes(relatedLesson.id);
            });
            const completedModuleQuizzes = moduleQuizzes.filter(q => quizResults[q.id]).length;
            const moduleProgressPercent = moduleQuizzes.length > 0
                ? Math.round((completedModuleQuizzes / moduleQuizzes.length) * 100)
                : 0;

            return {
                id: module.id,
                title: module.title,
                totalLessons: moduleLessons.length,
                attendedLessons: moduleAttended,
                attendancePercent: moduleAttendancePercent,
                quizzesCount: moduleQuizzes.length,
                completedQuizzes: completedModuleQuizzes,
                progressPercent: moduleProgressPercent,
            };
        });
    }, [courseModules, scheduledLessons, courseAttendance, courseQuizzes, quizResults]);

    const modulesWithSchedule = useMemo(() => {
        const nextLesson = scheduledLessons.find(l => !l.isPast);
        
        return courseModules.map(module => {
            const moduleLessons = scheduledLessons.filter(l => l.moduleId === module.id);
            const firstLesson = moduleLessons[0];
            const lastLesson = moduleLessons[moduleLessons.length - 1];
            const isPast = lastLesson ? lastLesson.isPast : false;
            
            const isCurrent = nextLesson && moduleLessons.some(l => l.lessonId === nextLesson.lessonId);

            return {
                ...module,
                lessons: moduleLessons,
                firstDate: firstLesson?.date,
                lastDate: lastLesson?.date,
                isPast,
                isCurrent,
            };
        }).sort((a, b) => {
            if (!a.firstDate || !b.firstDate) return 0;
            return a.firstDate.getTime() - b.firstDate.getTime();
        });
    }, [courseModules, scheduledLessons]);

    const nextLesson = scheduledLessons.find(l => !l.isPast);

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
                                                                                viewedContent[lesson.id]
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
                                                                                        viewedContent[lesson.id]
                                                                                            ? "attended"
                                                                                            : ""
                                                                                    }`}
                                                                                >
                                                                                    {viewedContent[lesson.id]
                                                                                        ? "👁"
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
                                                                                 quiz.isCompleted || quizResults[quiz.id]
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

                            <div className="course-progress-block">
                                <div className="course-progress-info">
                                    <span>Посещаемость</span>
                                    <span>{attendancePercent}%</span>
                                </div>
                                <div className="course-progress-bar">
                                    <div
                                        className="course-progress-fill course-progress-fill--attendance"
                                        style={{ width: `${attendancePercent}%` }}
                                    />
                                </div>
                            </div>

                            <div className="course-hours-spent">
                                Проведено на курсе: {totalHoursSpent} ч
                            </div>

                            {modulesStats.length > 0 && (
                                <div className="modules-stats">
                                    <h4 className="modules-stats__title">Статистика по модулям</h4>
                                    {modulesStats.map(module => (
                                        <div key={module.id} className="module-stat">
                                            <div className="module-stat__header">
                                                <span className="module-stat__name">{module.title}</span>
                                                <span className="module-stat__attendance">{module.attendancePercent}% посещений</span>
                                            </div>
                                            <div className="module-stat__progress">
                                                <div className="module-stat__progress-bar">
                                                    <div 
                                                        className="module-stat__progress-fill"
                                                        style={{ width: `${module.progressPercent}%` }}
                                                    />
                                                </div>
                                                <span className="module-stat__progress-text">
                                                    {module.completedQuizzes}/{module.quizzesCount} тестов
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </StatsSection>
                    </div>
                )}

                {activeTab === TAB_SCHEDULE && (
                    <div className="course-page__section">
                        <StatsSection title="Расписание курса">
                            {nextLesson && (
                                <div className="schedule-next-lesson">
                                    <span className="schedule-next-label">Ближайший урок:</span>
                                    <span className="schedule-next-date">
                                        {nextLesson.date.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })} в {nextLesson.date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                </div>
                            )}

                            {modulesWithSchedule.length > 0 ? (
                                <div className="schedule-modules">
                                    {modulesWithSchedule.map(module => {
                                        const isExpanded = expandedScheduleModules.has(module.id);
                                        return (
                                        <div 
                                            key={module.id} 
                                            className={`schedule-module ${module.isPast ? "past" : ""} ${module.isCurrent ? "current" : ""} ${!isExpanded ? "collapsed" : ""}`}
                                        >
                                            <button
                                                type="button"
                                                className="schedule-module__header"
                                                onClick={() => toggleScheduleModule(module.id)}
                                            >
                                                <div className="schedule-module__title">{module.title}</div>
                                                <div className="schedule-module__right">
                                                    {module.firstDate && module.lastDate && (
                                                        <div className="schedule-module__dates">
                                                            {formatDate(module.firstDate)} - {formatDate(module.lastDate)}
                                                        </div>
                                                    )}
                                                    <span className={`schedule-module__toggle ${isExpanded ? "expanded" : ""}`}>
                                                        ▼
                                                    </span>
                                                </div>
                                            </button>
                                            <div className={`schedule-module__lessons ${!isExpanded ? "hidden" : ""}`}>
                                                {module.lessons.map(lesson => {
                                                    const attended = user?.profileId ? isLessonAttended(lesson.title, user.profileId) : false;
                                                    const showAttended = lesson.isPast && attended;
                                                    return (
                                                    <div 
                                                        key={lesson.lessonId} 
                                                        className={`schedule-lesson ${lesson.isPast ? "past" : ""} ${showAttended ? "completed" : ""}`}
                                                    >
                                                        <div className="schedule-lesson__status">
                                                            {showAttended ? "✓" : lesson.isPast && !attended ? "✗" : "○"}
                                                        </div>
                                                        <div className="schedule-lesson__info">
                                                            <span className="schedule-lesson__title">{lesson.title}</span>
                                                            <span className="schedule-lesson__date">
                                                                {lesson.date.toLocaleDateString("ru-RU", { weekday: "short", day: "numeric", month: "short" })} в {lesson.date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );})}
                                            </div>
                                        </div>
                                    );})}
                                </div>
                            ) : (
                                <div className="course-schedule__empty">
                                    Расписание пока не назначено
                                </div>
                            )}
                        </StatsSection>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}