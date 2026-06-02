import { enrollments } from "@/entities/enrollment/model/enrollments"
import delay from "./delay"

export function getStudentEnrollments(studentId: string) {
  return enrollments.filter(e => e.studentId === studentId)
}

export async function enrollCourse(courseId: string, studentId: string): Promise<{
  success: boolean;
  enrollmentId: string;
  message: string;
}> {
  await delay(600);

  // Backend integration: Create enrollment record in database
  // const response = await fetch('/api/enrollments', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify({ courseId, studentId })
  // });

  return {
    success: true,
    enrollmentId: `e${Date.now()}`,
    message: "Студент успешно записан на курс"
  };
}

export async function getEnrollmentById(enrollmentId: string): Promise<any | null> {
  await delay(300);

  // Backend integration: Fetch enrollment details from server
  // const response = await fetch(`/api/enrollments/${enrollmentId}`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return enrollments.find(e => e.id === enrollmentId) || null;
}

export async function completeEnrollment(enrollmentId: string): Promise<{
  success: boolean;
  message: string;
}> {
  await delay(500);

  // Backend integration: Mark enrollment as completed on server
  // const response = await fetch(`/api/enrollments/${enrollmentId}/complete`, {
  //   method: 'POST',
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return { success: true, message: "Запись на курс завершена" };
}