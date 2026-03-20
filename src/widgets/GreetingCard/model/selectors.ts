import { courses } from "@/entities/course/model/courses";
import { enrollments } from "@/entities/enrollment/model/enrollments";
import { getNextLesson } from "@/entities/lesson/model/selectors";
import { getParentChildrenIdsByParentId } from "@/entities/parent/model/selectors";

import type { User } from "@/shared/types/user";

export type WelcomeData = {
  activeCourses?: number;
  nextLesson?: {
    courseTitle: string;
    date: string;
  };
  childrenIds?: string[];
};

export function getWelcomeData(user: User): WelcomeData {
  if (user.role === "Родитель") {
    return {
      childrenIds: getParentChildrenIdsByParentId(user.profileId),
    };
  }

  const activeCourses =
    user.role === "Ученик"
      ? enrollments.filter(
          (e) => e.studentId === user.profileId && e.status === "active",
        ).length
      : courses.filter((c) => c.teacherId === user.profileId).length;

  const nextLesson = getNextLesson(user.profileId);

  return {
    activeCourses,
    nextLesson,
  };
}
