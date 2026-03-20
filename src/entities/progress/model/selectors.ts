import type { CourseProgress } from "@/shared/types/courseProgress"

export function getCourseProgress(progress: CourseProgress) {
  return progress.progress
}

export function getCorrectPercent(progress: CourseProgress) {
  return progress.correctPercent
}