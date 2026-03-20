import type { CourseModule } from "@/shared/types/courseModule"

export function getModuleTitle(module: CourseModule) {
  return module.title
}

export function getModuleOrder(module: CourseModule) {
  return module.order
}