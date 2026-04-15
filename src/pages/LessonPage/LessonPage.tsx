import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AppLayout from "@/app/layout/AppLayout";
import { courses } from "@/entities/course/model/courses";
import { modules as allModules } from "@/entities/courseModule/model/courseModules";
import { lessons, tasks, quizzes } from "@/entities/lesson/model/lessons";
import { users } from "@/entities/user/model/users";
import type { Quiz, QuizQuestion } from "@/shared/types/courseModule";
import "./LessonPage.css";

type ContentType = "lesson" | "task" | "quiz";

export default function LessonPage() {
    const navigate = useNavigate();
    const { courseId, contentType, contentId } = useParams<{
        courseId: string;
        contentType: ContentType;
        contentId: string;
    }>();

    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const course = courses.find((c) => c.id === courseId);
    const teacher = course ? users.find((u) => u.profileId === course.teacherId) : undefined;

    const content = useMemo(() => {
        if (contentType === "lesson") {
            return lessons.find((l) => l.id === contentId);
        } else if (contentType === "task") {
            return tasks.find((t) => t.id === contentId);
        } else if (contentType === "quiz") {
            return quizzes.find((q) => q.id === contentId) as Quiz | undefined;
        }
        return null;
    }, [contentType, contentId]);

    const relatedLesson = useMemo(() => {
        if (contentType === "lesson") return content as typeof lessons[0] | undefined;
        if (contentType === "task") {
            const task = content as typeof tasks[0];
            return lessons.find((l) => l.id === task?.lessonId);
        }
        if (contentType === "quiz") {
            const quiz = content as typeof quizzes[0];
            return lessons.find((l) => l.id === quiz?.lessonId);
        }
        return undefined;
    }, [contentType, content]);

    const module = relatedLesson
        ? allModules.find((m) => m.id === relatedLesson.moduleId)
        : undefined;

    useEffect(() => {
        if (content) {
            document.title = `${content.title} - ${course?.title || "Курс"}`;
        }
    }, [content, course]);

    if (!course || !content) {
        return (
            <AppLayout>
                <div className="lesson-page">
                    <div className="lesson-page__not-found">
                        Материал не найден
                    </div>
                </div>
            </AppLayout>
        );
    }

    const getTypeLabel = () => {
        if (contentType === "lesson") return "Урок";
        if (contentType === "task") return "Задание";
        if (contentType === "quiz") return "Тест";
        return "";
    };

    const quizContent = contentType === "quiz" ? (content as Quiz) : null;
    const hasQuestions = quizContent && quizContent.questions && quizContent.questions.length > 0;

    return (
        <AppLayout>
            <div className="lesson-page">
                <div className="lesson-page__container">
                    <button
                        type="button"
                        className="lesson-page__back"
                        onClick={() => navigate(`/course/${courseId}`)}
                    >
                        ← Назад к курсу
                    </button>

                    <div className="lesson-page__header">
                        <span className="lesson-page__type">{getTypeLabel()}</span>
                        <h1 className="lesson-page__title">{content.title}</h1>
                        <p className="lesson-page__meta">
                            {module?.title}
                            {teacher && ` • ${teacher.firstName} ${teacher.lastName}`}
                        </p>
                    </div>

                    {hasQuestions ? (
                        <div className="quiz-content">
                            {quizContent.questions.map((question: QuizQuestion, qIndex: number) => (
                                <div key={question.id} className="quiz-question">
                                    <p className="quiz-question__text">
                                        <strong>{qIndex + 1}.</strong> {question.text}
                                    </p>
                                    <div className="quiz-options">
                                        {question.options.map((option) => (
                                            <label
                                                key={option.id}
                                                className={`quiz-option ${
                                                    answers[question.id] === option.id ? "selected" : ""
                                                } ${
                                                    submitted && option.isCorrect ? "correct" : ""
                                                } ${
                                                    submitted && answers[question.id] === option.id && !option.isCorrect ? "incorrect" : ""
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={question.id}
                                                    value={option.id}
                                                    disabled={submitted}
                                                    checked={answers[question.id] === option.id}
                                                    onChange={() => {
                                                        if (!submitted) {
                                                            setAnswers((prev) => ({
                                                                ...prev,
                                                                [question.id]: option.id,
                                                            }));
                                                        }
                                                    }}
                                                />
                                                <span className="quiz-option__text">{option.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {!submitted && (
                                <button
                                    type="button"
                                    className="quiz-submit"
                                    disabled={Object.keys(answers).length !== quizContent.questions.length}
                                    onClick={() => setSubmitted(true)}
                                >
                                    Отправить ответы
                                </button>
                            )}
                            {submitted && (
                                <div className="quiz-result">
                                    Правильных ответов:{" "}
                                    {quizContent.questions.filter(
                                        (q: QuizQuestion) =>
                                            q.options.find((o) => o.isCorrect)?.id === answers[q.id]
                                    ).length}{" "}
                                    из {quizContent.questions.length}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div
                            className="lesson-page__content"
                            dangerouslySetInnerHTML={{ __html: content.content || "<p>Материал готовится...</p>" }}
                        />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
