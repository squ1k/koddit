import { useNavigate } from "react-router-dom";
import "./PaymentCard.css";

interface Props {
    balance: number;
    paidCoursesCount?: number;
    unpaidCoursesCount?: number;
}

export default function PaymentCard({
    balance = 0,
    paidCoursesCount = 0,
    unpaidCoursesCount = 0,
}: Props) {
    const navigate = useNavigate();

    const handleTopUp = () => {
        navigate("/wallet/topup");
    };

    return (
        <div className="payment-card">
            <div className="payment-header">
                <h3>Оплата</h3>
            </div>

            <div className="payment-content">
                <div className="balance-section">
                    <span className="balance-label">Баланс:</span>
                    <span className="balance-amount">{balance}₽</span>
                </div>

                <div className="payment-summary">
                    <div className="payment-summary__item">
                        <span>Курсов оплачено</span>
                        <strong>{paidCoursesCount}</strong>
                    </div>
                    <div className="payment-summary__item payment-summary__item--unpaid">
                        <span>Курсов не оплачено</span>
                        <strong>{unpaidCoursesCount}</strong>
                    </div>
                </div>

                <button
                    className="topup-button"
                    onClick={handleTopUp}
                    title="Пополнить счет"
                >
                    Пополнить
                </button>
            </div>

            <div className="payment-info">
                <p className="info-text">
                    {unpaidCoursesCount > 0
                        ? `У вас ${unpaidCoursesCount} неоплаченных курсов. Пополните счет для доступа к занятиям.`
                        : "Пополните свой счет для оплаты курсов и услуг"}
                </p>
            </div>
        </div>
    );
}
