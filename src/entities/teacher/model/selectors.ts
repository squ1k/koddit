import type { Teacher } from "@/shared/types/teacher";

export function getTeacherCourseIds(teacher: Teacher) {
  return teacher.courseIds
}