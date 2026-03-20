import { lessons } from "@/entities/lesson/model/lessons"

export function getLessonsByModule(moduleId: string) {
  return lessons.filter(l => l.moduleId === moduleId)
}