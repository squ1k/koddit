type Course = {
    id: string;
    title: string;
    teacherId?: string;
    lessonsCount?: number;
    schedule?: { day: string; time: string }[];
};

type CompletedCoursesStatsProps = {
    courses: (Course | undefined)[];
};

export function CompletedCoursesStats({ courses }: CompletedCoursesStatsProps) {
    const filteredCourses = courses.filter(Boolean);

    return (
        <div className="completed-courses">
            {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                    <div key={course?.id} className="completed-course-item">
                        <div className="course-progress">
                            <span className="course-name">{course?.title}</span>
                            <span className="course-progress-percent">
                                100%
                            </span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill completed"
                                style={{ width: "100%" }}
                            />
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-data">Завершенные курсы еще не добавлены</p>
            )}
        </div>
    );
}
