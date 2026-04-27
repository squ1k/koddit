import { getAttendanceForCourse } from "@/entities/attendance/model/attendance";

type Course = {
    id: string;
    title: string;
};

type AttendanceStatsProps = {
    courses: (Course | undefined)[];
    studentId: string;
};

export function AttendanceStats({ courses, studentId }: AttendanceStatsProps) {
    const filteredCourses = courses.filter(Boolean);

    return (
        <div className="progress-list">
            {filteredCourses.map((course) => {
                const records = getAttendanceForCourse(course!.id, studentId);
                const total = records.length;
                const attended = records.filter((r) => r.attended).length;
                const percentage = total > 0 ? Math.round((attended / total) * 100) : 0;

                return (
                    <div key={course?.id} className="progress-item">
                        <div className="progress-header">
                            <span className="course-title">{course?.title}</span>
                            <span className="progress-percent">
                                {attended}/{total} ({percentage}%)
                            </span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill attendance"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}