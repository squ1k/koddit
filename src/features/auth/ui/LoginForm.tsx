import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";

import "./LoginForm.css";
import { authApi } from "../api/authApi";
import { login } from "@/app/store/store";

export default function LoginForm() {
    const navigate = useNavigate();

    const [phone, setPhone] = useState("+7 ");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        const digits = e.target.value.replace(/\D/g, "").slice(1, 11);

        let formatted = "+7 ";

        if (digits.length > 0) formatted += digits.slice(0, 3);

        if (digits.length >= 4) formatted += " " + digits.slice(3, 6);

        if (digits.length >= 7) formatted += "-" + digits.slice(6, 8);

        if (digits.length >= 9) formatted += "-" + digits.slice(8, 10);

        setPhone(formatted);
    }

    function validate() {
        let valid = true;

        const phoneRegex = /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        if (!phoneRegex.test(phone)) {
            setPhoneError("Введите полный номер телефона");
            valid = false;
        } else {
            setPhoneError("");
        }

        if (!passwordRegex.test(password)) {
            setPasswordError(
                "Пароль должен содержать минимум 6 символов, буквы и цифры",
            );
            valid = false;
        } else {
            setPasswordError("");
        }

        return valid;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!validate()) return;

        setIsLoading(true);
        try {
            const user = await authApi.login(phone, password);

            login(user);
            navigate("/profile");
        } catch (err) {
            setPasswordError("Неверный телефон или пароль");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className="login-form mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
                <Input
                    placeholder="+7 999 123-45-67"
                    value={phone}
                    onChange={handlePhoneChange}
                    disabled={isLoading}
                />

                {phoneError && <div className="form-error">{phoneError}</div>}
            </div>

            <div className="mb-3 password-field">
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />

                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                >
                    {showPassword ? (
                        <img
                            src="./hide.jpg"
                            style={{ width: "25px", height: "20px" }}
                        ></img>
                    ) : (
                        <img
                            src="./show.jpg"
                            style={{ width: "25px", height: "20px" }}
                        ></img>
                    )}
                </button>

                {passwordError && (
                    <div className="form-error">{passwordError}</div>
                )}
            </div>

            <Button isLoading={isLoading}>Войти</Button>
        </form>
    );
}
