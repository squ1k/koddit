import { useState } from "react";
import "./Calendar.css";

interface UpcomingLesson {
    id: string;
    courseTitle: string;
    lessonTitle: string;
    date: Date;
}

interface Props {
    lessons?: UpcomingLesson[];
}

const WEEKDAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

export default function Calendar({ lessons = [] }: Props) {
    const [weekOffset, setWeekOffset] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);
    const currentDate = new Date();

    const getWeekDays = (date: Date) => {
        const dayOfWeek = date.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const monday = new Date(date);
        monday.setDate(date.getDate() + mondayOffset + weekOffset * 7);

        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            days.push(d);
        }
        return days;
    };

    const weekDays = getWeekDays(currentDate);

    const monthName = weekDays[0].toLocaleString(
        "ru-RU",
        { month: "long", year: "numeric" },
    );

    const isToday = (date: Date) => {
        return (
            date.getDate() === currentDate.getDate() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getFullYear() === currentDate.getFullYear()
        );
    };

    const isPast = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const compareDate = new Date(date);
        compareDate.setHours(0, 0, 0, 0);
        return compareDate < today;
    };

    const formatWeekRange = (weekDays: Date[]) => {
        const monday = weekDays[0].toLocaleDateString("ru-RU", { day: "numeric", month: "numeric" });
        const sunday = weekDays[6].toLocaleDateString("ru-RU", { day: "numeric", month: "numeric" });
        return `${monday} - ${sunday}`;
    };

    return (
        <div className="calendar-widget shadow-sm-custom">
            <div className="calendar-header">
                <button
                    type="button"
                    className="calendar-toggle"
                    onClick={() => setIsExpanded((prev) => !prev)}
                    aria-expanded={isExpanded}
                >
                    <span className="calendar-title">Расписание</span>
                    <span className={`calendar-chevron ${isExpanded ? "open" : ""}`}>
                        ▾
                    </span>
                </button>
            </div>

            <div className={`calendar-content ${isExpanded ? "open" : ""}`}>
                <div className="calendar-week-nav mb-3">
                    <button
                        className="btn btn-week-nav"
                        onClick={() => setWeekOffset((w) => w - 1)}
                        aria-label="Предыдущая неделя"
                    >
                        ‹
                    </button>
                    <span className="week-range text-center">{formatWeekRange(weekDays)}</span>
                    <button
                        className="btn btn-week-nav"
                        onClick={() => setWeekOffset((w) => w + 1)}
                        aria-label="Следующая неделя"
                    >
                        ›
                    </button>
                </div>

                <div className="calendar-month-title text-center mb-3">{monthName}</div>

                <div className="calendar-week-view mb-4">
                    {weekDays.map((date, i) => {
                        const lessonCount = lessons.filter(
                            (lesson) =>
                                lesson.date.getDate() === date.getDate() &&
                                lesson.date.getMonth() === date.getMonth() &&
                                lesson.date.getFullYear() === date.getFullYear(),
                        ).length;

                        return (
                            <div
                                key={i}
                                className={`calendar-week-day ${
                                    isToday(date) ? "is-today" : ""
                                } ${isPast(date) ? "is-past" : ""}`}
                            >
                                <div className="week-day-name">
                                    {WEEKDAYS[i]}
                                </div>
                                <div className="week-day-date">
                                    {date.getDate()}
                                </div>
                                <div className={`week-day-line ${
                                    lessonCount > 0 ? "has-lesson" : ""
                                } ${isToday(date) ? "is-today" : ""}`} />
                                <div className="week-day-dots">
                                    {Array.from({ length: lessonCount }).map((_, j) => (
                                        <span
                                            key={j}
                                            className={`lesson-dot ${isPast(date) ? "is-past" : ""}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {lessons.length > 0 && (
                    <div className="lessons-list border-top pt-3">
                        <h4 className="mb-3">Уроки:</h4>
                        <ul className="list-unstyled m-0">
                            {lessons.slice(0, 6).map((lesson) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                const lessonDay = new Date(lesson.date);
                                lessonDay.setHours(0, 0, 0, 0);
                                const isPastLesson = lessonDay < today;

                                return (
                                    <li key={lesson.id} className={`d-flex gap-2 mb-2 ${isPastLesson ? "lesson-past" : ""}`}>
                                        <span className={`lesson-date fw-semibold ${isPastLesson ? "text-muted" : ""}`}>
                                            {lesson.date.toLocaleDateString("ru-RU")}
                                        </span>
                                        <span className={`lesson-info ${isPastLesson ? "text-muted" : ""}`}>
                                            {lesson.courseTitle} - {lesson.lessonTitle}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}