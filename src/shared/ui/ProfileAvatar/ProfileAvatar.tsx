import { Link } from "react-router-dom";
import "./ProfileAvatar.css";

type Props = {
    name: string;
};

export default function ProfileAvatar({ name }: Props) {
    return (
        <Link to="/stats" className="profile-avatar">
            {name.charAt(0).toUpperCase()}
        </Link>
    );
}
