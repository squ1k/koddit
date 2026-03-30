import { useState, useEffect } from "react";
import { useUser } from "@/app/store/store";
import { enrollments } from "@/entities/enrollment/model/enrollments";
import { courses } from "@/entities/course/model/courses";
import AppLayout from "@/app/layout/AppLayout";
import ProfileCard from "@/widgets/ProfileCard/ui";
import Tabs from "@/shared/ui/Tabs/Tabs";
import { PersonalDataForm } from "@/pages/PersonalDataPage";
import "./StudentStatsPage.css";

const TAB_STATISTICS = "statistics";
const TAB_PERSONAL_DATA = "personal";

export default function StudentStatsPage() {
    const user = useUser();
    const [activeTab, setActiveTab] = useState(TAB_STATISTICS);

    useEffect(() => {
        document.title = "Мой профиль";
    }, []);

    if (!user) {
        return null;
    }

    const studentEnrollments = enrollments.filter(
        (e) => e.studentId === user.profileId,
    );

    const activeEnrollments = studentEnrollments.filter(
        (e) => e.status === "active",
    );
    const completedEnrollments = studentEnrollments.filter(
        (e) => e.status === "completed",
    );

    const activeCourses = activeEnrollments
        .map((e) => courses.find((c) => c.id === e.courseId))
        .filter(Boolean);

    const completedCourses = completedEnrollments
        .map((e) => courses.find((c) => c.id === e.courseId))
        .filter(Boolean);

    const tabItems = [
        { label: "Статистика", value: TAB_STATISTICS },
        { label: "Личные данные", value: TAB_PERSONAL_DATA },
    ];

    return (
        <AppLayout>
            <div className="stats-page">
                <ProfileCard
                    name={user.firstName}
                    role={user.role}
                    certificates={1}
                    tasks={53}
                />

                <div className="stats-tabs">
                    <Tabs
                        items={tabItems}
                        value={activeTab}
                        onChange={setActiveTab}
                    />
                </div>

                {activeTab === TAB_STATISTICS && (
                    <div className="stats-content">
                        <div className="stats-section">
                            <h3>Активных курсов: {activeCourses.length}</h3>
                        </div>

                        <div className="stats-section">
                            <h3>Время на платформе:</h3>
                            <p className="time-on-platform">
                                31 ч. за последние 2 недели
                            </p>
                        </div>

                        <div className="stats-section">
                            <h3>Прогрессы по курсам</h3>
                            <div className="progress-list">
                                {activeCourses.map((course) => (
                                    <div
                                        key={course?.id}
                                        className="progress-item"
                                    >
                                        <div className="progress-header">
                                            <span className="course-title">
                                                {course?.title}
                                            </span>
                                            <span className="progress-percent">
                                                {course?.id === "c1"
                                                    ? "70%"
                                                    : "95%"}
                                            </span>
                                        </div>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{
                                                    width:
                                                        course?.id === "c1"
                                                            ? "70%"
                                                            : "95%",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="stats-section">
                            <h3>Процент правильных решений</h3>
                            <div className="progress-list">
                                {activeCourses.map((course) => (
                                    <div
                                        key={course?.id}
                                        className="progress-item"
                                    >
                                        <div className="progress-header">
                                            <span className="course-title">
                                                {course?.title}
                                            </span>
                                            <span className="progress-percent">
                                                {course?.id === "c1"
                                                    ? "63%"
                                                    : "87%"}
                                            </span>
                                        </div>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill correct"
                                                style={{
                                                    width:
                                                        course?.id === "c1"
                                                            ? "63%"
                                                            : "87%",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="stats-section">
                            <h3>Завершенные курсы</h3>
                            <div className="completed-courses">
                                {completedCourses.length > 0 ? (
                                    completedCourses.map((course) => (
                                        <div
                                            key={course?.id}
                                            className="completed-course-item"
                                        >
                                            <div className="course-progress">
                                                <span className="course-name">
                                                    {course?.title}
                                                </span>
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
                                    <p className="no-data">
                                        Завершенные курсы еще не добавлены
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="stats-section">
                            <h3>Сертификаты</h3>
                            <div className="certificates-grid">
                                <div className="certificate-card">
                                    <div className="certificate-image">
                                        <svg
                                            viewBox="0 0 100 100"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="10"
                                                y="10"
                                                width="80"
                                                height="80"
                                                stroke="#ddd"
                                                strokeWidth="2"
                                            />
                                            <line
                                                x1="10"
                                                y1="10"
                                                x2="90"
                                                y2="90"
                                                stroke="#ddd"
                                                strokeWidth="2"
                                            />
                                            <line
                                                x1="90"
                                                y1="10"
                                                x2="10"
                                                y2="90"
                                                stroke="#ddd"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    </div>
                                    <p className="certificate-title">
                                        Разработка на Python
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === TAB_PERSONAL_DATA && (
                    <div className="stats-content">
                        <PersonalDataForm />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
