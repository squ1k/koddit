import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from "@/pages/AuthPage";
import ProfilePage from "@/pages/ProfilePage";
import StudentStatsPage from "@/pages/StudentStatsPage";
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
                    path="/stats"
                    element={
                        <ProtectedRoute>
                            <StudentStatsPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
