import type { Enrollment } from "@/shared/types/enrollment";

export const enrollments: Enrollment[] = [

  {
    id: "e1",
    studentId: "s1",
    courseId: "c1",
    status: "active",
    paid: true,
    paidUntil: "2026-04-20"
  },

  {
    id: "e2",
    studentId: "s1",
    courseId: "c2",
    status: "active",
    paid: false,
    paidUntil: undefined
  },

  {
    id: "e3",
    studentId: "s1",
    courseId: "c3",
    status: "completed",
    paid: true,
    paidUntil: "2026-03-30"
  },

  {
    id: "e4",
    studentId: "s2",
    courseId: "c2",
    status: "active",
    paid: true,
    paidUntil: "2026-04-15"
  }

];

export function addEnrollment(enrollment: Enrollment) {
  enrollments.push(enrollment);
}
