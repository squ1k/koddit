import { teachers } from "@/entities/teacher/model/teachers"

export function getTeacherById(id: string) {
  return teachers.find((t) => t.id === id)
}

export const teacherApi = {
  getTeacherById,
}