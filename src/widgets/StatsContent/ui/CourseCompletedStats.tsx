import { getAttendanceForCourse } from "@/entities/attendance/model/attendance";

type Course = {
    id: string;
    title: string;
};

type CompletedCoursesStatsProps = {
    courses: (Course | undefined)[];
    studentId: string;
    courseStats?: Record<string, { progress: number; correct: number }>;
};

export function CompletedCoursesStats({ courses, studentId, courseStats }: CompletedCoursesStatsProps) {
    const filteredCourses = courses.filter(Boolean);

    if (filteredCourses.length === 0) {
        return <p className="no-data">Завершенные курсы еще не добавлены</p>;
    }

    return (
        <div className="completed-courses">
            {filteredCourses.map((course) => {
                const stats = courseStats?.[course!.id] || { progress: 100, correct: 87 };
                const records = getAttendanceForCourse(course!.id, studentId);
                const total = records.length;
                const attended = records.filter((r) => r.attended).length;
                const attendancePercent = total > 0 ? Math.round((attended / total) * 100) : 0;

                return (
                    <div key={course?.id} className="completed-course-item">
                        <div className="completed-course-header">
                            <span className="course-name">{course?.title}</span>
                        </div>
                        
                        <div className="completed-course-stats">
                            <div className="stat-row">
                                <span className="stat-name">Прогресс</span>
                                <span className="stat-value">{stats.progress}%</span>
                            </div>
                            <div className="progress-bar small">
                                <div className="progress-fill" style={{ width: `${stats.progress}%` }} />
                            </div>
                        </div>

                        <div className="completed-course-stats">
                            <div className="stat-row">
                                <span className="stat-name">Посещаемость</span>
                                <span className="stat-value">{attended}/{total} ({attendancePercent}%)</span>
                            </div>
                            <div className="progress-bar small">
                                <div className="progress-fill attendance" style={{ width: `${attendancePercent}%` }} />
                            </div>
                        </div>

                        <div className="completed-course-stats">
                            <div className="stat-row">
                                <span className="stat-name">Правильность</span>
                                <span className="stat-value">{stats.correct}%</span>
                            </div>
                            <div className="progress-bar small">
                                <div className="progress-fill correct" style={{ width: `${stats.correct}%` }} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}