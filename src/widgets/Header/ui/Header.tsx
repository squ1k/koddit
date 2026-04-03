import { usePageTitle, useUser } from "@/app/store/store";
import { Link } from "react-router-dom";

import "./Header.css";
import ProfileAvatar from "@/shared/ui/ProfileAvatar/ProfileAvatar";

export default function Header() {
    const user = useUser();
    const title = usePageTitle();

    return (
        <header>
            <div className="header-info d-flex justify-content-between">
                <Link to="/profile" className="logo-link">
                    <img src="/logo.svg" alt="Logo" className="logo"></img>
                </Link>

                <div>
                    <a href="tel:+7 992 346-65-45" className="contacts">
                        +7 992 346-65-45
                    </a>
                    <p className="text-muted">на связи 14–21 : 00</p>
                </div>
            </div>

            {user && title && (
                <div className="header-user mt-4">
                    <div className="d-flex">
                        <ProfileAvatar name={user.firstName} />

                        <span className="user-role">{user.role}</span>
                    </div>

                    <img className="header-divider" src="/divider-el.svg"></img>

                    <h1 className="page-title m-0">{title}</h1>
                </div>
            )}

            <img className="divider mb-4 mt-4" src="/divider.svg"></img>
        </header>
    );
}
