import type { Course } from "@/shared/types/course"

export function getCourseTitle(course: Course) {
  return course.title
}

export function getCourseSchedule(course: Course) {
  return course.schedule
}

export function getCourseTeacherId(course: Course) {
  return course.teacherId
}