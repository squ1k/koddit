import { courseProgress } from "@/entities/progress/model/courseProgress"

export function getProgressByEnrollment(enrollmentId: string) {
  return courseProgress.find(p => p.enrollmentId === enrollmentId)
}