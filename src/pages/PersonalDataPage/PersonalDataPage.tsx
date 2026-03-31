import { useEffect } from "react";
import { setPageTitle } from "@/app/store/store";
import AppLayout from "@/app/layout/AppLayout";
import { PersonalDataForm } from "@/widgets/PersonalDataForm";
import "./PersonalDataPage.css";

export default function PersonalDataPage() {
    useEffect(() => {
        setPageTitle("Личные данные");
    }, []);

    return (
        <AppLayout>
            <div className="page-wrapper">
                <PersonalDataForm />
            </div>
        </AppLayout>
    );
}

export { PersonalDataForm } from "@/widgets/PersonalDataForm";
