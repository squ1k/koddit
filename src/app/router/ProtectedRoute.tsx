import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/app/store/store";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const user = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/", { replace: true });
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    return <>{children}</>;
}
