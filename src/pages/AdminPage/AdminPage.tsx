import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUser, useUsersCount } from "@/app/store/store";
import { users } from "@/entities/user/model/users";
import type { User } from "@/shared/types/user";
import AppLayout from "@/app/layout/AppLayout";

import "./AdminPage.css";

const columns: Array<{
    label: string;
    key: keyof Pick<
        User,
        "firstName" | "lastName" | "role" | "phone" | "email"
    >;
}> = [
    { label: "ФИО", key: "lastName" },
    { label: "Роль", key: "role" },
    { label: "Телефон", key: "phone" },
    { label: "E-mail", key: "email" },
];

export default function AdminPage() {
    const user = useUser();
    const navigate = useNavigate();
    const usersCount = useUsersCount();
    const [sortBy, setSortBy] = useState<keyof User>("lastName");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        if (user && user.role !== "Администратор") {
            navigate("/profile", { replace: true });
        }
    }, [user, navigate]);

    const sortedUsers = useMemo(() => {
        const sorted = [...users];

        sorted.sort((a, b) => {
            const valueA = String(a[sortBy]).toLowerCase();
            const valueB = String(b[sortBy]).toLowerCase();

            if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
            if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [sortBy, sortOrder, usersCount]);

    if (!user || user.role !== "Администратор") {
        return null;
    }

    function handleSort(key: keyof User) {
        if (sortBy === key) {
            setSortOrder((current) => (current === "asc" ? "desc" : "asc"));
        } else {
            setSortBy(key);
            setSortOrder("asc");
        }
    }

    return (
        <AppLayout>
            <div className="admin-dashboard">
                <div className="admin-actions">
                    <h2>Администратор</h2>
                    <div className="admin-actions-row">
                        <Link className="admin-button" to="/admin/create-user">
                            Создать пользователя
                        </Link>
                        <Link className="admin-button" to="/admin/enroll-user">
                            Записать на курс
                        </Link>
                    </div>
                </div>

                <div className="admin-table-wrapper">
                    <div className="admin-table-header">
                        <span>Список пользователей</span>
                        <span className="admin-table-meta">
                            Всего пользователей: {users.length}
                        </span>
                    </div>

                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>№</th>
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        className="sortable-header"
                                        onClick={() => handleSort(column.key)}
                                    >
                                        {column.label}
                                        {sortBy === column.key && (
                                            <span>
                                                {sortOrder === "asc"
                                                    ? " ▼"
                                                    : " ▲"}
                                            </span>
                                        )}
                                    </th>
                                ))}
                                <th>Telegram</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.map((userItem, index) => (
                                <tr key={userItem.id}>
                                    <td>{index + 1}</td>
                                    <td>{`${userItem.lastName} ${userItem.firstName}`}</td>
                                    <td>{userItem.role}</td>
                                    <td>{userItem.phone}</td>
                                    <td>{userItem.email}</td>
                                    <td>{userItem.telegram}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
