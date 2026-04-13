import { Link } from "react-router-dom";
import "./ProfileAvatar.css";

type Props = {
    name: string;
    to?: string;
    disabled?: boolean;
};

export default function ProfileAvatar({ name, to, disabled }: Props) {
    const initial = name.charAt(0).toUpperCase();
    const isDisabled = Boolean(disabled);
    const className = `shared-profile-avatar${isDisabled ? " shared-profile-avatar--disabled" : ""}`;

    if (to && !isDisabled) {
        return (
            <Link
                to={to}
                className={className}
                aria-label="Перейти к личным данным"
            >
                {initial}
            </Link>
        );
    }

    return (
        <span className={className} aria-disabled={isDisabled}>
            {initial}
        </span>
    );
}
