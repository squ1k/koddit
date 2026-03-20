import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

interface Props {
    name: string;
    role: "Ученик" | "Учитель" | "Родитель" | "Администратор";
    certificates?: number;
    tasks?: number;
}

export default function ProfileCard({
    name,
    role,
    certificates = 0,
    tasks = 0,
}: Props) {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/stats");
    };

    return (
        <div className="profile-card">
            <div className="profile-header">
                <button
                    className="profile-avatar-btn"
                    onClick={handleProfileClick}
                    title="Перейти к статистике"
                >
                    <div className="profile-avatar">
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                        >
                            <circle cx="24" cy="24" r="24" fill="#1a1a1a" />
                            <circle cx="24" cy="18" r="7" fill="white" />
                            <path
                                d="M24 26C16 26 10 30 10 36V42H38V36C38 30 32 26 24 26Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                </button>

                <div className="profile-info">
                    <h3 className="profile-name">{name}</h3>
                    <p className="profile-role">{role}</p>
                </div>

                {(certificates > 0 || tasks > 0) && (
                    <div className="profile-stats-badge">
                        <div className="badge-item">
                            <span className="badge-number">{certificates}</span>
                            <span className="badge-label">
                                {certificates === 1
                                    ? "сертификат"
                                    : "сертификата"}
                            </span>
                        </div>
                        <div className="badge-item">
                            <span className="badge-number">{tasks}</span>
                            <span className="badge-label">
                                {tasks === 1 ? "задание" : "заданий"}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
