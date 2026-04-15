import { useState, useMemo, type ChangeEvent } from "react";
import { useUser, logout } from "@/app/store/store";
import { students } from "@/entities/student/model/students";
import { parents } from "@/entities/parent/model/parents";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import "./PersonalDataForm.css";

type PersonalDataFormValues = {
    firstName: string;
    lastName: string;
    birthDate: string;
    phone: string;
    email: string;
    telegram: string;
    parentName: string;
    parentPhone: string;
    parentEmail: string;
    parentTelegram: string;
};

export function PersonalDataForm() {
    const user = useUser();

    const parentInfo = useMemo(() => {
        if (!user || user.role !== "Ученик") return null;

        const student = students.find((s) => s.id === user.profileId);
        if (!student) return null;

        const parent = parents.find((p) => p.id === student.parentId);
        return parent ?? null;
    }, [user]);

    const [values, setValues] = useState<PersonalDataFormValues>({
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        birthDate: "",
        phone: user?.phone ?? "",
        email: user?.email ?? "",
        telegram: user?.telegram ?? "",
        parentName: parentInfo?.parentName ?? "",
        parentPhone: parentInfo?.phone ?? "",
        parentEmail: parentInfo?.email ?? "",
        parentTelegram: parentInfo?.telegram ?? "",
    });

    const [saved, setSaved] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    if (!user) {
        return <p>Пользователь не найден</p>;
    }

    const onChange =
        (field: keyof PersonalDataFormValues) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            setSaved(false);
            setValues((prev) => ({ ...prev, [field]: event.target.value }));
        };

    return (
        <div className="personal-data-form">
            <h2>Основные данные</h2>

            <div className="form-row">
                <label>
                    Имя
                    <Input
                        value={values.firstName}
                        onChange={onChange("firstName")}
                    />
                </label>

                <label>
                    Фамилия
                    <Input
                        value={values.lastName}
                        onChange={onChange("lastName")}
                    />
                </label>
            </div>

            <div className="form-row">
                <label>
                    Дата рождения
                    <Input
                        type="date"
                        value={values.birthDate}
                        onChange={onChange("birthDate")}
                    />
                </label>
            </div>

            <h2>Контактная информация</h2>

            <div className="form-row">
                <label>
                    Телефон
                    <Input value={values.phone} onChange={onChange("phone")} />
                </label>
            </div>

            <div className="form-row">
                <label>
                    E-mail
                    <Input value={values.email} onChange={onChange("email")} />
                </label>
            </div>

            <div className="form-row">
                <label>
                    Telegram
                    <Input
                        value={values.telegram}
                        onChange={onChange("telegram")}
                    />
                </label>
            </div>

            <div className="actions-row">
                <Button
                    type="button"
                    onClick={() => {
                        setSaved(true);
                    }}
                >
                    Сохранить изменения
                </Button>
                <Button
                    type="button"
                    onClick={() => {
                        setShowLogoutConfirm(true);
                    }}
                    className="btn-logout"
                >
                    Выйти
                </Button>
            </div>

            {saved && <p className="save-feedback">Сохранено</p>}

            {showLogoutConfirm && (
                <div
                    className="logout-confirmation-overlay"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="logout-confirmation-dialog">
                        <h3>Подтвердите выход</h3>
                        <p>Вы действительно хотите выйти из аккаунта?</p>
                        <div className="logout-confirmation-actions">
                            <Button
                                type="button"
                                onClick={() => {
                                    logout();
                                }}
                                className="btn-logout"
                            >
                                Да, выйти
                            </Button>
                            <button
                                type="button"
                                className="logout-cancel-button"
                                onClick={() => setShowLogoutConfirm(false)}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {user.role === "Ученик" && (
                <>
                    <h2>Информация о родителе</h2>

                    <div className="form-row">
                        <label>
                            Имя
                            <Input
                                value={values.parentName}
                                onChange={onChange("parentName")}
                            />
                        </label>
                    </div>

                    <div className="form-row">
                        <label>
                            Телефон
                            <Input
                                value={values.parentPhone}
                                onChange={onChange("parentPhone")}
                            />
                        </label>
                    </div>

                    <div className="form-row">
                        <label>
                            E-mail
                            <Input
                                value={values.parentEmail}
                                onChange={onChange("parentEmail")}
                            />
                        </label>
                    </div>

                    <div className="form-row">
                        <label>
                            Telegram
                            <Input
                                value={values.parentTelegram}
                                onChange={onChange("parentTelegram")}
                            />
                        </label>
                    </div>
                </>
            )}
        </div>
    );
}
