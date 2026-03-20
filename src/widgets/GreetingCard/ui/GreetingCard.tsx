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
    return (
        <div className="greeting-card">
            <div className="greeting-info">
                <h2 className="fw-bold">С возвращением, {name}!</h2>

                {role === "Родитель" ? (
                    <>
                        <p>
                            Дети:{" "}
                            {childrenIds?.length ? childrenIds.join(", ") : "—"}
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
