import { useEffect } from "react";

import { setPageTitle, useUser } from "@/app/store/store";
import { getWelcomeData } from "@/widgets/GreetingCard/model/selectors";

import AppLayout from "@/app/layout/AppLayout";
import GreetingCard from "@/widgets/GreetingCard/ui/GreetingCard";
import CourseList from "@/widgets/CourseList/ui";
import "./ProfilePage.css";

export default function StudentProfilePage() {
    useEffect(() => {
        setPageTitle("Личный кабинет");
    }, []);

    const user = useUser();

    const welcomeData = getWelcomeData(user!);

    return (
        <AppLayout>
            <div className="profile-page">

                <GreetingCard
                    name={user!.firstName}
                    role={user!.role}
                    activeCourses={welcomeData.activeCourses}
                    nextLesson={welcomeData.nextLesson}
                    childrenIds={welcomeData.childrenIds}
                />

                {(user!.role === "Ученик" || user!.role === "Учитель") && (
                    <>
                        <CourseList
                            userId={user!.profileId}
                            role={user!.role}
                        />
                        <CourseList
                            userId={user!.profileId}
                            role={user!.role}
                            status="completed"
                        />
                    </>
                )}
            </div>
        </AppLayout>
    );
}
