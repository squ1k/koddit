import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from "@/pages/AuthPage";
import ProfilePage from "@/pages/ProfilePage";
import StudentStatsPage from "@/pages/StudentStatsPage";
import PersonalDataPage from "@/pages/PersonalDataPage";
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

                <Route
                    path="/profile/personal"
                    element={
                        <ProtectedRoute>
                            <PersonalDataPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
