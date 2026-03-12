import { useState } from "react";

import AuthHero from "@/widgets/AuthHero/ui";
import Tabs from "@/shared/ui/Tabs";
import LoginForm from "@/features/auth/ui";

import "./AuthPage.css";

export default function AuthPage() {
    const [tab, setTab] = useState("login");

    return (
        <>
            <AuthHero />
            <Tabs
                items={[
                    { label: "Вход", value: "login" },
                    { label: "Регистрация", value: "register" },
                ]}
                value={tab}
                onChange={setTab}
            />
            <div className="auth-content">
                {tab === "login" && <LoginForm />}

                {tab === "register" && (
                    <div className="register-info">
                        <p>
                            Для регистрации необходимо обратиться к нашим
                            методистам:
                        </p>

                        <p className="register-phone">+7 992 346-65-45</p>
                        <div className="col-auto">
                            <a
                                href="https://t.me/kontinuumadmin"
                                target="_blank"
                                className="me-3"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="/tg.svg"
                                    alt="Telegram"
                                    style={{ width: "40px", height: "40px" }}
                                />
                            </a>
                            <a
                                href="https://vk.me/vk.koddit"
                                target="_blank"
                                className="me-3"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="/vk.svg"
                                    alt="VK"
                                    style={{ width: "40px", height: "40px" }}
                                />
                            </a>
                            <a
                                href="https://max.ru/u/f9LHodD0cOI21LXRbIRfETt8k27m_sn_KaiY6x-sGJIGVH-g6qJXvflE62g"
                                target="_blank"
                                className="max"
                                style={{ width: "40px", height: "40px" }}
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="/maxwhite.svg"
                                    alt="Max"
                                    style={{ width: "35px", height: "35px" }}
                                />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
