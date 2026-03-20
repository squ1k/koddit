import { enrollments } from "@/entities/enrollment/model/enrollments"

export function getStudentEnrollments(studentId: string) {
  return enrollments.filter(e => e.studentId === studentId)
}