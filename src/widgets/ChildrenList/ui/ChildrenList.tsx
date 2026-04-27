import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { students } from "@/entities/student/model/students";
import { users } from "@/entities/user/model/users";
import { courses } from "@/entities/course/model/courses";
import { enrollments } from "@/entities/enrollment/model/enrollments";
import { getLocalEnrollments, getAllLocalBalances } from "@/app/store/store";
import Calendar from "@/widgets/Calendar";
import StatsOverview from "@/widgets/StatsOverview/ui/StatsOverview";
import "./ChildrenList.css";

interface Child {
    id: string;
    name: string;
    birthDate: string;
    balance: number;
}

interface ChildrenListProps {
    childrenIds: string[];
}

export default function ChildrenList({ childrenIds }: ChildrenListProps) {
    const navigate = useNavigate();
    const localEnrollments = getLocalEnrollments();
    const localBalances = getAllLocalBalances();

    const children = useMemo(() => {
        return childrenIds
            .map((childId) => {
                const student = students.find((s) => s.id === childId);
                if (!student) return null;

                const user = users.find(
                    (u) => u.profileId === childId && u.role === "Ученик",
                );
                if (!user) return null;

                return {
                    id: childId,
                    name: `${user.firstName} ${user.lastName}`,
                    birthDate: student.birthDate,
                    balance: localBalances[childId] ?? student.balance,
                };
            })
            .filter(Boolean) as Child[];
    }, [childrenIds, localBalances]);

    const getChildEnrollments = (childId: string) => {
        return enrollments.filter(e => e.studentId === childId);
    };

    const WEEKDAY_MAP: Record<string, number> = {
        "Понедельник": 0,
        "Вторник": 1,
        "Среда": 2,
        "Четверг": 3,
        "Пятница": 4,
        "Суббота": 5,
        "Воскресенье": 6,
    };

    function getMondayOfWeek(reference: Date, weeksOffset: number): Date {
        const date = new Date(reference);
        const dayOfWeek = date.getDay();
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        date.setDate(date.getDate() + diff + weeksOffset * 7);
        date.setHours(0, 0, 0, 0);
        return date;
    }

    const getChildScheduleLessons = (childId: string) => {
        const childEnrollments = getChildEnrollments(childId);
        const activeEnrollments = childEnrollments.filter(e => e.status === "active");
        
        const today = new Date();
        const currentWeekMonday = getMondayOfWeek(today, 0);

        const allLessons: {
            id: string;
            courseTitle: string;
            lessonTitle: string;
            date: Date;
        }[] = [];

        activeEnrollments.forEach(enrollment => {
            const course = courses.find(c => c.id === enrollment.courseId);
            if (!course) return;

            for (let weekOffset = -4; weekOffset <= 4; weekOffset++) {
                const monday = new Date(currentWeekMonday);
                monday.setDate(currentWeekMonday.getDate() + weekOffset * 7);

                course.schedule.forEach((scheduleItem, scheduleIndex) => {
                    const dayOffset = WEEKDAY_MAP[scheduleItem.day] ?? 0;
                    const lessonDate = new Date(monday);
                    lessonDate.setDate(monday.getDate() + dayOffset);

                    const [hours, minutes] = scheduleItem.time.split(":").map(Number);
                    lessonDate.setHours(hours, minutes, 0, 0);

                    allLessons.push({
                        id: `${enrollment.id}-${scheduleIndex}-w${weekOffset + 4}`,
                        courseTitle: course.title,
                        lessonTitle: `${scheduleItem.day}, ${scheduleItem.time}`,
                        date: lessonDate,
                    });
                });
            }
        });

        return allLessons;
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
    };

    return (
        <div className="children-list">
            <h3>Мои дети</h3>
            {children.length === 0 ? (
                <p>Нет зарегистрированных детей</p>
            ) : (
                <div className="children-grid">
                    {children.map((child) => {
                        const childEnrollments = getChildEnrollments(child.id);
                        const scheduleLessons = getChildScheduleLessons(child.id);
                        const activeCourses = childEnrollments.filter(e => e.status === "active");
                        
                        return (
                            <div key={child.id} className="child-card">
                                <button 
                                    className="child-card-header"
                                    onClick={(e) => {
                                        const card = e.currentTarget.closest('.child-card');
                                        card?.classList.toggle('expanded');
                                    }}
                                >
                                    <div className="child-info">
                                        <h4>{child.name}</h4>
                                        <span className="child-courses-count">
                                            {activeCourses.length} активных курсов
                                        </span>
                                    </div>
                                    <span className="expand-icon">▾</span>
                                </button>
                                
                                <div className="child-card-content">
                                    <div className="child-section">
                                        <h5>Информация о ребенке</h5>
                                        <div className="info-row">
                                            <span className="info-label">Дата рождения:</span>
                                            <span className="info-value">{formatDate(child.birthDate)}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">Баланс:</span>
                                            <span className="info-value balance-value">{child.balance}₽</span>
                                        </div>
                                    </div>

                                    <div className="child-section">
                                        <Calendar lessons={scheduleLessons} />
                                    </div>

                                    <div className="child-section child-stats-section">
                                        <StatsOverview studentId={child.id} showCertificates={false} />
                                    </div>

                                    <div className="child-section">
                                        <h5>Оплата курсов</h5>
                                        {activeCourses.length === 0 ? (
                                            <p className="no-data">Нет активных курсов</p>
                                        ) : (
                                            <div className="courses-list">
                                                {activeCourses.map(enrollment => {
                                                    const course = courses.find(c => c.id === enrollment.courseId);
                                                    const localData = localEnrollments[enrollment.id];
                                                    const isPaid = localData?.paid ?? enrollment.paid;
                                                    const paidUntil = localData?.paidUntil || enrollment.paidUntil;
                                                    
                                                    return (
                                                        <div key={enrollment.id} className="course-item">
                                                            <div className="course-header">
                                                                <span className="course-name">{course?.title}</span>
                                                                <span className={`payment-status ${isPaid ? 'paid' : 'unpaid'}`}>
                                                                    {isPaid ? `Оплачено до ${formatDate(paidUntil || '')}` : 'Не оплачено'}
                                                                </span>
                                                            </div>
                                                            <div className="course-price">
                                                                {course?.price}₽/мес
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    <div className="child-section">
                                        <div className="child-actions">
                                            <button 
                                                className="action-button"
                                                onClick={() => navigate(`/wallet/topup?studentId=${child.id}`)}
                                            >
                                                Пополнить баланс
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}