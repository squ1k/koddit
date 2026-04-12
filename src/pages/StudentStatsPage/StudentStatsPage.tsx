import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useUser } from "@/app/store/store";
import { enrollments } from "@/entities/enrollment/model/enrollments";
import { courses } from "@/entities/course/model/courses";
import { users } from "@/entities/user/model/users";
import { getParentChildrenIdsByParentId } from "@/entities/parent/model/selectors";
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
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(TAB_STATISTICS);

    useEffect(() => {
        document.title = "Статистика";
    }, []);

    if (!user) {
        return null;
    }

    const studentId = searchParams.get("studentId") || user.profileId;

    // Check permissions
    if (studentId !== user.profileId) {
        if (user.role === "Родитель") {
            const childrenIds = getParentChildrenIdsByParentId(user.profileId);
            if (!childrenIds.includes(studentId)) {
                return <div>Доступ запрещен</div>;
            }
        } else {
            return <div>Доступ запрещен</div>;
        }
    }

    const studentUser = users.find(
        (u) => u.profileId === studentId && u.role === "Ученик",
    );

    if (!studentUser) {
        return <div>Студент не найден</div>;
    }

    const studentEnrollments = enrollments.filter(
        (e) => e.studentId === studentId,
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
                    name={studentUser.firstName}
                    role={studentUser.role}
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
                        <StatsSection title="">
                            <PersonalDataForm />
                        </StatsSection>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
