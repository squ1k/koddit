import { modules } from "@/entities/courseModule/model/courseModules"

export function getModulesByCourse(courseId: string) {
  return modules.filter(m => m.courseId === courseId)
}