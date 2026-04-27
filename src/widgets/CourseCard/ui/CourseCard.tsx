import { type CourseListItem } from "@/widgets/CourseList/model/selectors";
import { type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/app/store/store";
import { getChatBetweenUsers } from "@/entities/chat/model/selectors";

import "./CourseCard.css";

type Props = {
    course: CourseListItem;
    hideProgress: boolean;
};

export default function CourseCard({ course, hideProgress }: Props) {
    const navigate = useNavigate();
    const user = useUser();
    const progress = hideProgress ? undefined : course.progress;

    const openCourse = () => {
        navigate(`/course/${course.courseId}`);
    };

    const openTeacherChat = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (!user || !course.teacherId) {
            navigate("/chat");
            return;
        }

        const chat = getChatBetweenUsers(user.id, course.teacherId);
        if (chat) {
            navigate(`/chat/${chat.id}`);
        } else {
            navigate("/chat");
        }
    };

    return (
        <div
            className="course-card"
            role="button"
            onClick={openCourse}
            tabIndex={0}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    openCourse();
                }
            }}
        >
            <div className="course-card__header">
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

                <button
                    type="button"
                    className="course-card__action course-card__chat-btn"
                    onClick={openTeacherChat}
                >
                    Написать учителю
                </button>
            </div>
        </div>
    );
}
