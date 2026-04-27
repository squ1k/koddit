import { useMemo } from "react";
import { students } from "@/entities/student/model/students";
import { courses } from "@/entities/course/model/courses";
import { enrollments } from "@/entities/enrollment/model/enrollments";
import { getAttendanceForCourse } from "@/entities/attendance/model/attendance";
import {
    StatsSection,
    CourseProgressStats,
    CourseCorrectStats,
    CompletedCoursesStats,
    CertificatesStats,
    AttendanceStats,
} from "@/widgets/StatsContent";
import "./StatsOverview.css";

type StatsOverviewProps = {
    studentId: string;
    showCertificates?: boolean;
};

export function StatsOverview({ studentId, showCertificates = true }: StatsOverviewProps) {
    const student = students.find((s) => s.id === studentId);
    const studentEnrollments = enrollments.filter(
        (e) => e.studentId === studentId,
    );
    const activeEnrollments = studentEnrollments.filter(
        (e) => e.status === "active",
    );
    const completedEnrollments = studentEnrollments.filter(
        (e) => e.status === "completed",
    );

    const activeCourses = useMemo(() => {
        return activeEnrollments
            .map((e) => courses.find((c) => c.id === e.courseId))
            .filter(Boolean);
    }, [activeEnrollments]);

    const completedCourses = useMemo(() => {
        return completedEnrollments
            .map((e) => courses.find((c) => c.id === e.courseId))
            .filter(Boolean);
    }, [completedEnrollments]);

    const attendanceStats = useMemo(() => {
        let total = 0;
        let attended = 0;

        activeEnrollments.forEach((enrollment) => {
            const records = getAttendanceForCourse(
                enrollment.courseId,
                studentId,
            );
            total += records.length;
            attended += records.filter((r) => r.attended).length;
        });

        return {
            total,
            attended,
            percentage: total > 0 ? Math.round((attended / total) * 100) : 0,
        };
    }, [activeEnrollments, studentId]);

    const timeOnPlatform = useMemo(() => {
        const enrolledCourses = activeEnrollments.length + completedEnrollments.length;
        const hours = enrolledCourses * 8;
        const days = Math.ceil(hours / 4);
        return { hours, days };
    }, [activeEnrollments, completedEnrollments]);

    const completedCourseStats = useMemo(() => {
        return {
            c2: { progress: 100, correct: 87 },
            c3: { progress: 100, correct: 72 },
        };
    }, []);

    if (!student) {
        return null;
    }

    return (
        <div className="stats-overview">
            <div className="stats-summary">
                <div className="stat-card">
                    <span className="stat-value">{attendanceStats.percentage}%</span>
                    <span className="stat-label">Посещаемость</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{studentEnrollments.length}</span>
                    <span className="stat-label">Курсов</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{completedCourses.length}</span>
                    <span className="stat-label">Завершено</span>
                </div>
            </div>

            <div className="time-on-platform">
                <span>Время на платформе: {timeOnPlatform.hours} часов (~{timeOnPlatform.days} дней)</span>
            </div>

            <StatsSection title="Прогресс по курсам">
                <CourseProgressStats courses={activeCourses} />
            </StatsSection>

            <StatsSection title="Посещаемость по курсам">
                <AttendanceStats courses={activeCourses} studentId={studentId} />
            </StatsSection>

            <StatsSection title="Правильность ответов">
                <CourseCorrectStats courses={activeCourses} />
            </StatsSection>

            {completedCourses.length > 0 && (
                <StatsSection title="Завершенные курсы">
                    <CompletedCoursesStats 
                        courses={completedCourses} 
                        studentId={studentId}
                        courseStats={completedCourseStats}
                    />
                </StatsSection>
            )}

            {completedCourses.length > 0 && showCertificates && (
                <StatsSection title="Сертификаты">
                    <CertificatesStats />
                </StatsSection>
            )}
        </div>
    );
}

export default StatsOverview;