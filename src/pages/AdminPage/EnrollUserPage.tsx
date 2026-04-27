import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "@/app/layout/AppLayout";
import { setPageTitle, useUser } from "@/app/store/store";
import { users } from "@/entities/user/model/users";
import { courses } from "@/entities/course/model/courses";
import { addEnrollment } from "@/entities/enrollment/model/enrollments";
import type { Enrollment } from "@/shared/types/enrollment";

import "./AdminPage.css";
import "@/widgets/PaymentCard/ui/PaymentCard.css";

export default function EnrollUserPage() {
    const user = useUser();
    const navigate = useNavigate();

    const [studentId, setStudentId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [status, setStatus] = useState<Enrollment["status"]>("active");
    const [paid, setPaid] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        setPageTitle("Записать на курс");
    }, []);

    useEffect(() => {
        if (user && user.role !== "Администратор") {
            navigate("/profile", { replace: true });
        }
    }, [user, navigate]);

    if (!user || user.role !== "Администратор") {
        return null;
    }

    const studentUsers = users.filter((item) => item.role === "Ученик");
    const availableCourses = courses;

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!studentId || !courseId) {
            setSuccessMessage("Выберите ученика и курс для записи.");
            return;
        }

        const enrollmentId = `e${Date.now()}`;
        addEnrollment({
            id: enrollmentId,
            studentId,
            courseId,
            status,
            paid,
        });

        setSuccessMessage("Запись успешно создана.");
        setStudentId("");
        setCourseId("");
        setStatus("active");
        setPaid(true);

        setTimeout(() => {
            navigate("/profile");
        }, 1000);
    }

    return (
        <AppLayout>
            <div className="admin-form-page">
                <div className="admin-form-panel">
                    <h2>Записать пользователя на курс</h2>
                    <form className="admin-form" onSubmit={handleSubmit}>
                        <label>
                            Ученик
                            <select
                                className="admin-select"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                            >
                                <option value="">Выберите ученика</option>
                                {studentUsers.map((student) => (
                                    <option
                                        key={student.id}
                                        value={student.profileId}
                                    >
                                        {student.lastName} {student.firstName}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Курс
                            <select
                                className="admin-select"
                                value={courseId}
                                onChange={(e) => setCourseId(e.target.value)}
                            >
                                <option value="">Выберите курс</option>
                                {availableCourses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Статус
                            <select
                                className="admin-select"
                                value={status}
                                onChange={(e) =>
                                    setStatus(
                                        e.target.value as Enrollment["status"],
                                    )
                                }
                            >
                                <option value="active">Активный</option>
                                <option value="completed">Завершён</option>
                            </select>
                        </label>

                        <label className="payment-toggle-switch">
                            <span className="payment-toggle__label">Оплачено</span>
                            <input
                                type="checkbox"
                                className="payment-toggle__checkbox"
                                checked={paid}
                                onChange={(e) => setPaid(e.target.checked)}
                            />
                            <span className="payment-toggle__switch" />
                        </label>

                        <button type="submit" className="admin-submit-button">
                            Сохранить запись
                        </button>
                        {successMessage && (
                            <p className="admin-success">{successMessage}</p>
                        )}
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
