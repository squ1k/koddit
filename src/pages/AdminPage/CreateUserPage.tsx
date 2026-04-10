import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "@/app/layout/AppLayout";
import { setPageTitle, useUser } from "@/app/store/store";
import {
    addUser,
    generateProfileId,
    generateUserId,
    users,
} from "@/entities/user/model/users";
import { addParent } from "@/entities/parent/model/parents";
import { addStudent } from "@/entities/student/model/students";
import type { Role } from "@/shared/types/user";

import "./AdminPage.css";

const roles: Role[] = ["Ученик", "Родитель", "Учитель", "Администратор"];

export default function CreateUserPage() {
    const user = useUser();
    const navigate = useNavigate();

    const [role, setRole] = useState<Role>("Ученик");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("+7 ");
    const [email, setEmail] = useState("");
    const [telegram, setTelegram] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        setPageTitle("Создать пользователя");
    }, []);

    useEffect(() => {
        if (user && user.role !== "Администратор") {
            navigate("/profile", { replace: true });
        }
    }, [user, navigate]);

    if (!user || user.role !== "Администратор") {
        return null;
    }

    function formatPhoneInput(raw: string) {
        const digits = raw.replace(/\D/g, "").slice(1, 11);
        let formatted = "+7 ";

        if (digits.length > 0) formatted += digits.slice(0, 3);
        if (digits.length >= 4) formatted += " " + digits.slice(3, 6);
        if (digits.length >= 7) formatted += "-" + digits.slice(6, 8);
        if (digits.length >= 9) formatted += "-" + digits.slice(8, 10);

        return formatted;
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const trimmedFirstName = firstName.trim();
        const trimmedLastName = lastName.trim();
        const trimmedEmail = email.trim();
        const trimmedTelegram = telegram.trim();

        if (
            !trimmedFirstName ||
            !trimmedLastName ||
            !phone.match(/^\+7 \d{3} \d{3}-\d{2}-\d{2}$/) ||
            !password ||
            !trimmedEmail
        ) {
            setSuccessMessage("Пожалуйста, заполните все поля корректно.");
            return;
        }

        const profileId = generateProfileId(role);
        const newUser = {
            id: generateUserId(),
            role,
            profileId,
            firstName: trimmedFirstName,
            lastName: trimmedLastName,
            phone: phone.trim(),
            email: trimmedEmail,
            telegram: trimmedTelegram || "-",
            password,
        };

        addUser(newUser);

        if (role === "Ученик") {
            addStudent({
                id: profileId,
                birthDate: "",
                balance: 0,
                parentId: "",
            });
        }

        if (role === "Родитель") {
            addParent({ id: profileId, childrenIds: [] });
        }

        setSuccessMessage(
            `Пользователь ${trimmedLastName} ${trimmedFirstName} создан.`,
        );
        setFirstName("");
        setLastName("");
        setPhone("+7 ");
        setEmail("");
        setTelegram("");
        setPassword("");
        setRole("Ученик");

        setTimeout(() => {
            navigate("/profile");
        }, 1000);
    }

    return (
        <AppLayout>
            <div className="admin-form-page">
                <div className="admin-form-panel">
                    <h2>Создать нового пользователя</h2>
                    <form className="admin-form" onSubmit={handleSubmit}>
                        <label>
                            Роль
                            <select
                                value={role}
                                onChange={(e) =>
                                    setRole(e.target.value as Role)
                                }
                            >
                                {roles.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Имя
                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Фамилия
                            <input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Телефон
                            <input
                                value={phone}
                                onChange={(e) =>
                                    setPhone(formatPhoneInput(e.target.value))
                                }
                                required
                            />
                        </label>

                        <label>
                            E-mail
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Telegram
                            <input
                                value={telegram}
                                onChange={(e) => setTelegram(e.target.value)}
                            />
                        </label>

                        <label>
                            Пароль
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>

                        <button type="submit" className="admin-submit-button">
                            Создать пользователя
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
