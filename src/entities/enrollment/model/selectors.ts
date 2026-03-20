import type { Enrollment } from "@/shared/types/enrollment"

export function getActiveEnrollments(enrollments: Enrollment[]) {
  return enrollments.filter(e => e.status === "active")
}

export function getCompletedEnrollments(enrollments: Enrollment[]) {
  return enrollments.filter(e => e.status === "completed")
}