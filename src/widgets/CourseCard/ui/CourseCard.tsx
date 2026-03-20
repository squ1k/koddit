import { type CourseListItem } from "@/widgets/CourseList/model/selectors";

import "./CourseCard.css";

type Props = {
    course: CourseListItem;
    hideProgress: boolean;
};

export default function CourseCard({ course, hideProgress }: Props) {
    const progress = hideProgress ? undefined : course.progress;

    return (
        <div className="course-card">
            <div className="course-card__header">
                <div className="course-card__icon" aria-hidden>
                    🎮
                </div>

                <div className="course-card__title">
                    <div className="course-card__name">{course.title}</div>
                    <div className="course-card__meta">
                        {course.lessonsCount} занятия
                    </div>
                </div>

                {typeof progress === "number" ? (
                    <div className="course-card__progress-label">
                        {progress}%
                    </div>
                ) : null}
            </div>

            {typeof progress === "number" ? (
                <div className="course-card__progress">
                    <div
                        className="course-card__progress-bar"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            ) : null}

            <div className="course-card__footer">
                <button type="button" className="course-card__action" disabled>
                    Материалы последнего занятия
                </button>

                <button type="button" className="course-card__action" disabled>
                    💬
                </button>
            </div>
        </div>
    );
}
