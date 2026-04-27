import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setPageTitle, useUser, topUpBalance } from "@/app/store/store";
import { users } from "@/entities/user/model/users";
import { getParentChildrenIdsByParentId } from "@/entities/parent/model/selectors";
import AppLayout from "@/app/layout/AppLayout";
import "./WalletTopUpPage.css";

type PaymentMethod = "card" | "sbp" | "sberpay";

export default function WalletTopUpPage() {
    const navigate = useNavigate();
    const user = useUser();
    const [searchParams] = useSearchParams();
    const [amount, setAmount] = useState<string>("");
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setPageTitle("Пополнение счёта");
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
            topUpBalance(parseInt(amount, 10));
            setIsSubmitting(false);
            navigate("/profile");
        }, 500);
    };

    return (
        <AppLayout>
            <div className="wallet-topup-page">
                <div className="topup-container">
                    <div className="topup-card">
                        <h1 className="topup-title">
                            Пополнение счёта {studentUser.firstName}{" "}
                            {studentUser.lastName}
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
