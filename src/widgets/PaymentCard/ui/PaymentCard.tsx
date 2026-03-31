import { useNavigate } from "react-router-dom";
import "./PaymentCard.css";

interface Props {
    balance: number;
}

export default function PaymentCard({ balance = 0 }: Props) {
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
                    Пополните свой счет для оплаты курсов и услуг
                </p>
            </div>
        </div>
    );
}
