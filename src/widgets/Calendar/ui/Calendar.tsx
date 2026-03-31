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

export default function Calendar({ lessons = [] }: Props) {
    const [currentDate] = useState(new Date());

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const monthName = new Date(currentYear, currentMonth, 1).toLocaleString(
        "ru-RU",
        { month: "long", year: "numeric" },
    );

    const getLessonDates = () => {
        return lessons.map((lesson) => lesson.date.getDate());
    };

    const lessonDates = getLessonDates();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

    return (
        <div className="calendar-widget">
            <div className="calendar-header">
                <h3>Расписание</h3>
            </div>

            <div className="calendar-month-title">{monthName}</div>

            <div className="calendar-weekdays">
                <div className="weekday">ПН</div>
                <div className="weekday">ВТ</div>
                <div className="weekday">СР</div>
                <div className="weekday">ЧТ</div>
                <div className="weekday">ПТ</div>
                <div className="weekday">СБ</div>
                <div className="weekday">ВС</div>
            </div>

            <div className="calendar-days">
                {emptyDays.map((_, i) => (
                    <div key={`empty-${i}`} className="calendar-empty" />
                ))}
                {days.map((day) => (
                    <div
                        key={day}
                        className={`calendar-day ${
                            lessonDates.includes(day) ? "has-lesson" : ""
                        }`}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {lessons.length > 0 && (
                <div className="lessons-list">
                    <h4>Предстоящие уроки:</h4>
                    <ul>
                        {lessons.slice(0, 3).map((lesson) => (
                            <li key={lesson.id}>
                                <span className="lesson-date">
                                    {lesson.date.toLocaleDateString("ru-RU")}
                                </span>
                                <span className="lesson-info">
                                    {lesson.courseTitle} - {lesson.lessonTitle}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
