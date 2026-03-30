import { useEffect, useState, type ChangeEvent } from "react";
import { useUser, logout, setPageTitle } from "@/app/store/store";
import AppLayout from "@/app/layout/AppLayout";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import "./PersonalDataPage.css";

type PersonalDataFormValues = {
    firstName: string;
    lastName: string;
    birthDate: string;
    phone: string;
    email: string;
    telegram: string;
    parentPhone: string;
    parentEmail: string;
    parentTelegram: string;
};

export function PersonalDataForm() {
    const user = useUser();

    const [values, setValues] = useState<PersonalDataFormValues>({
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        birthDate: "",
        phone: user?.phone ?? "",
        email: user?.email ?? "",
        telegram: user?.telegram ?? "",
        parentPhone: "",
        parentEmail: "",
        parentTelegram: "",
    });

    const [saved, setSaved] = useState(false);

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
                        logout();
                    }}
                >
                    Выйти
                </Button>
            </div>

            {saved && <p className="save-feedback">Сохранено</p>}

            <h2>Информация о родителе</h2>

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
        </div>
    );
}

export default function PersonalDataPage() {
    useEffect(() => {
        setPageTitle("Личные данные");
    }, []);

    return (
        <AppLayout>
            <div className="page-wrapper">
                <PersonalDataForm />
            </div>
        </AppLayout>
    );
}
