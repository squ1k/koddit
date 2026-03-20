import { courses } from "@/entities/course/model/courses";
import { enrollments } from "@/entities/enrollment/model/enrollments";

import type { Lesson } from "@/shared/types/lesson"

export function getLessonTitle(lesson: Lesson) {
  return lesson.title
}

export function getLessonOrder(lesson: Lesson) {
  return lesson.order
}

export function getNextLesson(profileId: string) {
  const studentActive = enrollments.filter(
    (e) => e.studentId === profileId && e.status === "active",
  );

  if (studentActive.length > 0) {
    const course = courses.find((c) => c.id === studentActive[0].courseId);
    if (course && course.schedule.length > 0) {
      const { day, time } = course.schedule[0];
      return {
        courseTitle: course.title,
        date: `${day} ${time}`,
      };
    }
  }

  const teacherCourse = courses.find((c) => c.teacherId === profileId);
  if (teacherCourse && teacherCourse.schedule.length > 0) {
    const { day, time } = teacherCourse.schedule[0];
    return {
      courseTitle: teacherCourse.title,
      date: `${day} ${time}`,
    };
  }

  return undefined;
}