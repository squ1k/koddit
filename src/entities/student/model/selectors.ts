import type { Student } from "@/shared/types/student"

export function getStudentBalance(student: Student) {
  return student.balance
}

export function getStudentParentId(student: Student) {
  return student.parentId
}