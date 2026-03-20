import { courses } from "@/entities/course/model/courses"
import { enrollments } from "@/entities/enrollment/model/enrollments"

export function getCourseById(courseId: string) {
  return courses.find((c) => c.id === courseId)
}

export function getCoursesByTeacher(teacherId: string) {
  return courses.filter((c) => c.teacherId === teacherId)
}

export function getCoursesByStudent(studentId: string) {
  const studentEnrollments = enrollments.filter(
    (e) => e.studentId === studentId
  )

  return studentEnrollments.map((e) =>
    courses.find((c) => c.id === e.courseId),
  )
}

export const courseApi = {
  getCourseById,
  getCoursesByTeacher,
  getCoursesByStudent,
}