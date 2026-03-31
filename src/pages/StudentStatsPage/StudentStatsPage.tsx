import { useState, useEffect } from "react";
import { useUser } from "@/app/store/store";
import { enrollments } from "@/entities/enrollment/model/enrollments";
import { courses } from "@/entities/course/model/courses";
import AppLayout from "@/app/layout/AppLayout";
import ProfileCard from "@/widgets/ProfileCard/ui";
import Tabs from "@/shared/ui/Tabs/Tabs";
import { PersonalDataForm } from "@/widgets/PersonalDataForm";
import {
    StatsSection,
    CourseProgressStats,
    CourseCorrectStats,
    CompletedCoursesStats,
    CertificatesStats,
} from "@/widgets/StatsContent";
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
                        <StatsSection
                            title={`Активных курсов: ${activeCourses.length}`}
                        />

                        <StatsSection title="Время на платформе:">
                            <p className="time-on-platform">
                                31 ч. за последние 2 недели
                            </p>
                        </StatsSection>

                        <StatsSection title="Прогрессы по курсам">
                            <CourseProgressStats courses={activeCourses} />
                        </StatsSection>

                        <StatsSection title="Процент правильных решений">
                            <CourseCorrectStats courses={activeCourses} />
                        </StatsSection>

                        <StatsSection title="Завершенные курсы">
                            <CompletedCoursesStats courses={completedCourses} />
                        </StatsSection>

                        <StatsSection title="Сертификаты">
                            <CertificatesStats />
                        </StatsSection>
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
