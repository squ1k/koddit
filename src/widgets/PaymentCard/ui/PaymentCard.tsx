import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Enrollment } from "@/shared/types/enrollment";
import { courses } from "@/entities/course/model/courses";
import "./PaymentCard.css";

interface Props {
    balance: number;
    enrollments?: Enrollment[];
}

export default function PaymentCard({
    balance = 0,
    enrollments = [],
}: Props) {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(true);
    const [autoPayment, setAutoPayment] = useState(false);

    const handleTopUp = () => {
        navigate("/wallet/topup");
    };

    const enrollmentDetails = enrollments.map((enrollment) => {
        const course = courses.find((c) => c.id === enrollment.courseId);
        return {
            id: enrollment.id,
            paid: enrollment.paid,
            courseName: course?.title ?? "Неизвестный курс",
        };
    });

    return (
        <div className="payment-card">
            <div className="payment-header">
                <button
                    type="button"
                    className="payment-toggle"
                    onClick={() => setIsExpanded((prev) => !prev)}
                    aria-expanded={isExpanded}
                >
                    <span className="payment-title">Оплата</span>
                    <span className={`payment-chevron ${isExpanded ? "open" : ""}`}>
                        ▾
                    </span>
                </button>
            </div>

            <div className={`payment-content ${isExpanded ? "open" : ""}`}>
                <div className="payment-toggle-row">
                    <label className="payment-toggle-switch">
                        <span className="payment-toggle__label">Автооплата</span>
                        <input
                            type="checkbox"
                            className="payment-toggle__checkbox"
                            checked={autoPayment}
                            onChange={(e) => setAutoPayment(e.target.checked)}
                        />
                        <span className="payment-toggle__switch" />
                    </label>
                </div>

                <div className="balance-topup-row">
                    <div className="balance-section">
                        <span className="balance-label">Баланс:</span>
                        <span className="balance-amount">{balance}₽</span>
                    </div>
                    <button
                        className="topup-button"
                        onClick={handleTopUp}
                        title="Пополнить счет"
                    >
                        Пополнить
                    </button>
                </div>

                <div className="courses-payment-list">
                    {enrollmentDetails.map((enrollment) => (
                        <div
                            key={enrollment.id}
                            className={`course-payment-item ${
                                enrollment.paid ? "paid" : "unpaid"
                            }`}
                        >
                            <span className="course-name">
                                {enrollment.courseName}
                            </span>
                            <span
                                className={`course-status ${
                                    enrollment.paid ? "paid" : "unpaid"
                                }`}
                            >
                                {enrollment.paid ? "Оплачено" : "Не оплачено"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}