import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from "@/pages/AuthPage";
import ProfilePage from "@/pages/ProfilePage";
import StudentStatsPage from "@/pages/StudentStatsPage";
import PersonalDataPage from "@/pages/PersonalDataPage";
import WalletTopUpPage from "@/pages/WalletTopUpPage";
import CoursePage from "@/pages/CoursePage";
import ChatPage from "@/pages/ChatPage";
import AdminPage from "@/pages/AdminPage";
import AdminCreateUserPage from "@/pages/AdminPage/CreateUserPage";
import AdminEnrollUserPage from "@/pages/AdminPage/EnrollUserPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthPage />} />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/create-user"
                    element={
                        <ProtectedRoute>
                            <AdminCreateUserPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/enroll-user"
                    element={
                        <ProtectedRoute>
                            <AdminEnrollUserPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/stats"
                    element={
                        <ProtectedRoute>
                            <StudentStatsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile/personal"
                    element={
                        <ProtectedRoute>
                            <PersonalDataPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/course/:courseId"
                    element={
                        <ProtectedRoute>
                            <CoursePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/wallet/topup"
                    element={
                        <ProtectedRoute>
                            <WalletTopUpPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/chat"
                    element={
                        <ProtectedRoute>
                            <ChatPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/chat/:chatId"
                    element={
                        <ProtectedRoute>
                            <ChatPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
