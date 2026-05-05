import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import * as store from "@/app/store/store";

vi.mock("@/app/store/store", () => ({
    useUser: vi.fn(),
}));

describe("ProtectedRoute", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render children when user is logged in", () => {
        vi.mocked(store.useUser).mockReturnValue({
            id: "1",
            phone: "+1234567890",
            password: "password",
            role: "student",
            profileId: "student1",
        });

        render(
            <MemoryRouter>
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            </MemoryRouter>,
        );

        expect(screen.getByText("Protected Content")).toBeInTheDocument();
    });

    it("should not render children when user is not logged in", () => {
        vi.mocked(store.useUser).mockReturnValue(null);

        render(
            <MemoryRouter>
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            </MemoryRouter>,
        );

        expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    });

    it("should handle undefined user state", () => {
        vi.mocked(store.useUser).mockReturnValue(undefined);

        render(
            <MemoryRouter>
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            </MemoryRouter>,
        );

        expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    });
});
