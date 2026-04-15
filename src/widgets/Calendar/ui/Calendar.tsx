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
    const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
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
        { month: "long" },
    ) + " " + weekDays[0].getFullYear();

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
                        const dayLessons = lessons.filter(
                            (lesson) =>
                                lesson.date.getDate() === date.getDate() &&
                                lesson.date.getMonth() === date.getMonth() &&
                                lesson.date.getFullYear() === date.getFullYear(),
                        );

                        const handleClick = () => {
                            setSelectedDayIndex(selectedDayIndex === i ? null : i);
                        };

                        return (
                            <div
                                key={i}
                                className={`calendar-week-day ${
                                    isToday(date) ? "is-today" : ""
                                } ${isPast(date) ? "is-past" : ""} ${
                                    selectedDayIndex === i ? "selected" : ""
                                }`}
                            >
                                <button
                                    type="button"
                                    className="calendar-day-button"
                                    onClick={handleClick}
                                >
                                    <div className="week-day-name">
                                        {WEEKDAYS[i]}
                                    </div>
                                    <div className="week-day-date">
                                        {date.getDate()}
                                    </div>
                                    <div className={`week-day-line ${
                                        isToday(date) ? "is-today" : ""
                                    }`} />
                                    <div className="week-day-dots">
                                        {Array.from({ length: dayLessons.length }).map((_, j) => (
                                            <span
                                                key={j}
                                                className={`lesson-dot ${isPast(date) ? "is-past" : ""}`}
                                            />
                                        ))}
                                    </div>
                                </button>
                                {selectedDayIndex === i && (
                                    <div className="day-lessons accordion-content">
                                        {dayLessons.length > 0 ? (
                                            <ul className="list-unstyled m-0">
                                                {dayLessons.map((lesson) => (
                                                    <li key={lesson.id} className="day-lesson-item">
                                                        <span className="day-lesson-time">
                                                            {lesson.lessonTitle.split(", ")[1]}
                                                        </span>
                                                        <span className="day-lesson-title">
                                                            {lesson.courseTitle}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="no-lessons-text">
                                                В этот день занятий не запланировано
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {(() => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const futureLessons = lessons.filter((lesson) => {
                        const lessonDay = new Date(lesson.date);
                        lessonDay.setHours(0, 0, 0, 0);
                        return lessonDay >= today;
                    }).slice(0, 3);

                    return futureLessons.length > 0 && (
                        <div className="nearest-lessons border-top pt-3">
                            <h4 className="mb-3">Ближайшие занятия:</h4>
                            <ul className="list-unstyled m-0">
                                {futureLessons.map((lesson) => (
                                    <li key={lesson.id} className="d-flex gap-2 mb-2">
                                        <span className="lesson-date fw-semibold">
                                            {lesson.date.toLocaleDateString("ru-RU")}
                                        </span>
                                        <span className="lesson-info">
                                            {lesson.courseTitle} - {lesson.lessonTitle}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}