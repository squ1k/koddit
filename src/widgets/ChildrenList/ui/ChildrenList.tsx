import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { students } from "@/entities/student/model/students";
import { users } from "@/entities/user/model/users";
import Button from "@/shared/ui/Button/Button";
import Card from "@/shared/ui/Card/Card";
import "./ChildrenList.css";

interface Child {
    id: string;
    name: string;
}

interface ChildrenListProps {
    childrenIds: string[];
}

export default function ChildrenList({ childrenIds }: ChildrenListProps) {
    const navigate = useNavigate();

    const children = useMemo(() => {
        return childrenIds
            .map((childId) => {
                const student = students.find((s) => s.id === childId);
                if (!student) return null;

                const user = users.find(
                    (u) => u.profileId === childId && u.role === "Ученик",
                );
                if (!user) return null;

                return {
                    id: childId,
                    name: `${user.firstName} ${user.lastName}`,
                };
            })
            .filter(Boolean) as Child[];
    }, [childrenIds]);

    const handleViewStats = (childId: string) => {
        navigate(`/stats?studentId=${childId}`);
    };

    const handleViewSchedule = (childId: string) => {
        navigate(`/schedule?studentId=${childId}`);
    };

    const handleViewPayments = (childId: string) => {
        navigate(`/wallet/topup?studentId=${childId}`);
    };

    return (
        <Card className="children-list">
            <h3>Мои дети</h3>
            {children.length === 0 ? (
                <p>Нет зарегистрированных детей</p>
            ) : (
                <div className="children-grid">
                    {children.map((child) => (
                        <div key={child.id} className="child-card">
                            <h4>{child.name}</h4>
                            <div className="child-actions">
                                <Button
                                    onClick={() => handleViewStats(child.id)}
                                    variant="secondary"
                                >
                                    Статистика
                                </Button>
                                <Button
                                    onClick={() => handleViewSchedule(child.id)}
                                    variant="secondary"
                                >
                                    Расписание
                                </Button>
                                <Button
                                    onClick={() => handleViewPayments(child.id)}
                                    variant="secondary"
                                >
                                    Платежи
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}
