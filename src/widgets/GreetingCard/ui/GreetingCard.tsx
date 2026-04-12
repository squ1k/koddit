import { useMemo } from "react";
import { users } from "@/entities/user/model/users";
import "./GreetingCard.css";

interface Props {
    name: string;
    role: "Ученик" | "Учитель" | "Родитель" | "Администратор";
    activeCourses?: number;
    nextLesson?: {
        courseTitle: string;
        date: string;
    };
    childrenIds?: string[];
}

export default function GreetingCard({
    name,
    role,
    activeCourses,
    nextLesson,
    childrenIds,
}: Props) {
    const childrenNames = useMemo(() => {
        if (!childrenIds) return [];
        return childrenIds.map((childId) => {
            const user = users.find(
                (u) => u.profileId === childId && u.role === "Ученик",
            );
            return user ? `${user.firstName} ${user.lastName}` : childId;
        });
    }, [childrenIds]);

    return (
        <div className="greeting-card">
            <div className="greeting-info">
                <h2 className="fw-bold">С возвращением, {name}!</h2>

                {role === "Родитель" ? (
                    <>
                        <p>
                            Дети:{" "}
                            {childrenNames.length
                                ? childrenNames.join(", ")
                                : "—"}
                        </p>
                    </>
                ) : (
                    <>
                        <p>Активных курсов: {activeCourses ?? 0}</p>

                        {nextLesson && (
                            <p>
                                Следующий урок: {nextLesson.date}
                                <br />
                                Курс: {nextLesson.courseTitle}
                            </p>
                        )}
                    </>
                )}
            </div>

            <img
                className="greeting-emoji"
                src="./smile-happy.svg"
                alt="Welcome"
            />
        </div>
    );
}
