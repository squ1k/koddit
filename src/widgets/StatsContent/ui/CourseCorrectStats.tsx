type Course = {
    id: string;
    title: string;
    teacherId?: string;
    lessonsCount?: number;
    schedule?: { day: string; time: string }[];
};

type CourseCorrectStatsProps = {
    courses: (Course | undefined)[];
};

export function CourseCorrectStats({ courses }: CourseCorrectStatsProps) {
    const filteredCourses = courses.filter(Boolean);

    return (
        <div className="progress-list">
            {filteredCourses.map((course) => (
                <div key={course?.id} className="progress-item">
                    <div className="progress-header">
                        <span className="course-title">{course?.title}</span>
                        <span className="progress-percent">
                            {course?.id === "c1" ? "63%" : "87%"}
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill correct"
                            style={{
                                width: course?.id === "c1" ? "63%" : "87%",
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
