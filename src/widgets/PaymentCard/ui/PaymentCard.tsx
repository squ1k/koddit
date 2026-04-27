import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Enrollment } from "@/shared/types/enrollment";
import { courses } from "@/entities/course/model/courses";
import { useUser, useBalance, payForCourse, getLocalEnrollments, subscribe } from "@/app/store/store";
import "./PaymentCard.css";

interface Props {
    enrollments?: Enrollment[];
}

export default function PaymentCard({
    enrollments = [],
}: Props) {
    const navigate = useNavigate();
    const user = useUser();
    const balance = useBalance();
    const [isExpanded, setIsExpanded] = useState(true);
    const [autoPayment, setAutoPayment] = useState(false);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        const unsubscribe = subscribe(() => {});
        return () => { unsubscribe(); };
    }, []);

    const handleTopUp = () => {
        navigate("/wallet/topup");
    };

    const handlePay = async (enrollmentId: string) => {
        if (!user) return;
        
        setProcessingId(enrollmentId);
        setMessage(null);
        
        const result = payForCourse(enrollmentId, user.profileId);
        
        setMessage({
            type: result.success ? "success" : "error",
            text: result.message
        });
        
        setProcessingId(null);
        
        setTimeout(() => setMessage(null), 3000);
    };

    const enrollmentDetails = useMemo(() => {
        const localEnrollments = getLocalEnrollments();
        return enrollments.map((enrollment) => {
            const course = courses.find((c) => c.id === enrollment.courseId);
            const localData = localEnrollments[enrollment.id];
            const isPaid = localData?.paid ?? enrollment.paid;
            const paidUntil = localData?.paidUntil || enrollment.paidUntil;
            
            return {
                id: enrollment.id,
                paid: isPaid,
                paidUntil: paidUntil,
                courseName: course?.title ?? "Неизвестный курс",
                price: course?.price ?? 0,
            };
        });
    }, [enrollments]);

    const formatDate = (dateStr: string | undefined) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
    };

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

                {message && (
                    <div className={`payment-message ${message.type}`}>
                        {message.text}
                    </div>
                )}

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
                            <div className="course-info">
                                <span className="course-name">
                                    {enrollment.courseName}
                                </span>
                                <span className="course-price">
                                    {enrollment.price}₽/мес
                                </span>
                            </div>
                            <div className="course-actions">
                                {enrollment.paid && enrollment.paidUntil ? (
                                    <span className="course-paid-until">
                                        Оплачено до {formatDate(enrollment.paidUntil)}
                                    </span>
                                ) : (
                                    <button
                                        className="pay-button"
                                        onClick={() => handlePay(enrollment.id)}
                                        disabled={processingId === enrollment.id}
                                    >
                                        {processingId === enrollment.id ? "..." : "Оплатить"}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}