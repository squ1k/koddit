type Course = {
    id: string;
    title: string;
    teacherId?: string;
    lessonsCount?: number;
    schedule?: { day: string; time: string }[];
};

type CourseProgressStatsProps = {
    courses: (Course | undefined)[];
};

export function CourseProgressStats({ courses }: CourseProgressStatsProps) {
    const filteredCourses = courses.filter(Boolean);

    return (
        <div className="progress-list">
            {filteredCourses.map((course) => (
                <div key={course?.id} className="progress-item">
                    <div className="progress-header">
                        <span className="course-title">{course?.title}</span>
                        <span className="progress-percent">
                            {course?.id === "c1" ? "70%" : "95%"}
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{
                                width: course?.id === "c1" ? "70%" : "95%",
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
