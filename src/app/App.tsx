import { useEffect } from "react";
import AppRouter from "./router";
import { useTheme } from "./store/store";

export default function App() {
    const theme = useTheme();

    useEffect(() => {
        // Apply theme on mount and when it changes
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    }, [theme]);

    return <AppRouter />;
}
