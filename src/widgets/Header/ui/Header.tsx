import {
    usePageTitle,
    useUser,
    useTheme,
    toggleTheme,
} from "@/app/store/store";
import { Link } from "react-router-dom";

import "./Header.css";
import ProfileAvatar from "@/shared/ui/ProfileAvatar/ProfileAvatar";

export default function Header() {
    const user = useUser();
    const title = usePageTitle();
    const theme = useTheme();

    return (
        <header>
            <div className="header-info d-flex justify-content-between align-items-center">
                <Link to="/profile" className="logo-link">
                    <img
                        src={`${import.meta.env.BASE_URL}logo.svg`}
                        alt="Logo"
                        className="logo"
                    ></img>
                </Link>

                <div className="header-contact-and-theme">
                    <div>
                        <a href="tel:+7 992 346-65-45" className="contacts">
                            +7 992 346-65-45
                        </a>
                        <p className="text-muted">на связи 14–21 : 00</p>
                    </div>

                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        title={
                            theme === "light" ? "Темная тема" : "Светлая тема"
                        }
                        aria-label={
                            theme === "light"
                                ? "Включить темную тему"
                                : "Включить светлую тему"
                        }
                    >
                        {theme === "light" ? (
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        ) : (
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line
                                    x1="4.22"
                                    y1="4.22"
                                    x2="5.64"
                                    y2="5.64"
                                ></line>
                                <line
                                    x1="18.36"
                                    y1="18.36"
                                    x2="19.78"
                                    y2="19.78"
                                ></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line
                                    x1="4.22"
                                    y1="19.78"
                                    x2="5.64"
                                    y2="18.36"
                                ></line>
                                <line
                                    x1="18.36"
                                    y1="5.64"
                                    x2="19.78"
                                    y2="4.22"
                                ></line>
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {user && title && (
                <div className="header-user mt-4">
                    <div className="d-flex">
                        <ProfileAvatar
                            name={user.firstName}
                            to={
                                user.role !== "Администратор"
                                    ? "/profile/personal"
                                    : undefined
                            }
                            disabled={user.role === "Администратор"}
                        />

                        <span className="user-role">{user.role}</span>
                    </div>

                    <img
                        className="header-divider"
                        src={`${import.meta.env.BASE_URL}divider-el.svg`}
                    ></img>

                    <h1 className="page-title m-0">{title}</h1>
                </div>
            )}

            <img
                className="divider mb-4 mt-4"
                src={`${import.meta.env.BASE_URL}divider.svg`}
            ></img>
        </header>
    );
}
