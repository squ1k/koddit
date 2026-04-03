import { courses } from "@/entities/course/model/courses";
import { courseProgress } from "@/entities/progress/model/courseProgress";
import { enrollments } from "@/entities/enrollment/model/enrollments";

import type { User } from "@/shared/types/user";

export type CourseListItem = {
  courseId: string;
  title: string;
  lessonsCount: number;
  schedule: { day: string; time: string }[];
  progress?: number;
  enrollmentId?: string;
  teacherId?: string;
};

export function getCourseItems(
  role: User["role"],
  profileId: string,
  status: "active" | "completed" = "active",
): CourseListItem[] {
  if (role === "Ученик") {
    return enrollments
      .filter((e) => e.studentId === profileId && e.status === status)
      .map((e) => {
        const course = courses.find((c) => c.id === e.courseId);
        if (!course) return null;

        const progress = courseProgress.find((p) => p.enrollmentId === e.id)?.progress;

        const item: CourseListItem = {
          courseId: course.id,
          title: course.title,
          lessonsCount: course.lessonsCount,
          schedule: course.schedule,
          teacherId: course.teacherId,
        };

        if (typeof progress === "number") {
          item.progress = progress;
        }

        return item;
      })
      .filter((x): x is CourseListItem => x !== null);
  }

  if (role === "Учитель") {
    const teacherCourses = courses.filter((c) => c.teacherId === profileId);

    if (status === "active") {
      return teacherCourses.map((c) => ({
        courseId: c.id,
        title: c.title,
        lessonsCount: c.lessonsCount,
        schedule: c.schedule,
        teacherId: c.teacherId,
      }));
    }

    // completed: show courses where at least one student completed it (by enrollment)
    const completedCourseIds = new Set(
      enrollments
        .filter((e) => e.status === "completed")
        .map((e) => e.courseId),
    );

    return teacherCourses
      .filter((c) => completedCourseIds.has(c.id))
      .map((c) => ({
        courseId: c.id,
        title: c.title,
        lessonsCount: c.lessonsCount,
        schedule: c.schedule,
      }));
  }

  return [];
}

export function getActiveCourseItems(role: User["role"], profileId: string) {
  return getCourseItems(role, profileId, "active");
}
