import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setPageTitle } from "@/app/store/store";
import AppLayout from "@/app/layout/AppLayout";
import "./WalletTopUpPage.css";

type PaymentMethod = "card" | "sbp" | "sberpay";

export default function WalletTopUpPage() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState<string>("");
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setPageTitle("Пополнение счёта");
    }, []);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, "");
        setAmount(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!amount || parseInt(amount) <= 0) {
            alert("Пожалуйста, введите сумму больше 0");
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            alert(
                `Платеж на сумму ${amount}₽ через ${getPaymentMethodName(selectedMethod)} успешно обработан!`,
            );
            setIsSubmitting(false);
            navigate("/profile");
        }, 1500);
    };

    const getPaymentMethodName = (method: PaymentMethod): string => {
        const names: Record<PaymentMethod, string> = {
            card: "Карту",
            sbp: "СБП",
            sberpay: "SberPay",
        };
        return names[method];
    };

    return (
        <AppLayout>
            <div className="wallet-topup-page">
                <div className="topup-container">
                    <button
                        className="back-button"
                        onClick={() => navigate("/profile")}
                        title="Вернуться назад"
                    >
                        ← На главную
                    </button>

                    <div className="topup-card">
                        <h1 className="topup-title">
                            Введите сумму пополнения
                        </h1>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="amount-input-wrapper">
                                    <input
                                        type="text"
                                        className="amount-input"
                                        placeholder="0"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        disabled={isSubmitting}
                                    />
                                    <span className="currency">₽</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <h2 className="payment-method-title">
                                    Выберите метод оплаты
                                </h2>

                                <div className="payment-methods">
                                    <label className="payment-method">
                                        <input
                                            type="radio"
                                            name="method"
                                            value="card"
                                            checked={selectedMethod === "card"}
                                            onChange={(e) =>
                                                setSelectedMethod(
                                                    e.target
                                                        .value as PaymentMethod,
                                                )
                                            }
                                            disabled={isSubmitting}
                                        />
                                        <span className="method-name">
                                            Карта
                                        </span>
                                    </label>

                                    <label className="payment-method">
                                        <input
                                            type="radio"
                                            name="method"
                                            value="sbp"
                                            checked={selectedMethod === "sbp"}
                                            onChange={(e) =>
                                                setSelectedMethod(
                                                    e.target
                                                        .value as PaymentMethod,
                                                )
                                            }
                                            disabled={isSubmitting}
                                        />
                                        <span className="method-name">СБП</span>
                                    </label>

                                    <label className="payment-method">
                                        <input
                                            type="radio"
                                            name="method"
                                            value="sberpay"
                                            checked={
                                                selectedMethod === "sberpay"
                                            }
                                            onChange={(e) =>
                                                setSelectedMethod(
                                                    e.target
                                                        .value as PaymentMethod,
                                                )
                                            }
                                            disabled={isSubmitting}
                                        />
                                        <span className="method-name">
                                            SberPay
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isSubmitting || !amount}
                            >
                                {isSubmitting ? "Обработка..." : "Пополнить"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
