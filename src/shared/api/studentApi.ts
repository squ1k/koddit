import { students } from "@/entities/student/model/students"

export function getStudentById(id: string) {
  return students.find((s) => s.id === id)
}

export const studentApi = {
  getStudentById,
}