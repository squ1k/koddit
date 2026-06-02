import { teachers } from "@/entities/teacher/model/teachers"
import delay from "./delay"

export function getTeacherById(id: string) {
  return teachers.find((t) => t.id === id)
}

export async function getCoursesByTeacher(teacherId: string): Promise<any[]> {
  await delay(500);

  // Backend integration: Fetch courses created by teacher
  // const response = await fetch(`/api/teachers/${teacherId}/courses`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return [];
}

export async function getStudentSubmissions(
  courseId: string,
  studentId?: string
): Promise<any[]> {
  await delay(700);

  // Backend integration: Fetch all task and quiz submissions for course or specific student
  // const url = studentId
  //   ? `/api/courses/${courseId}/submissions?studentId=${studentId}`
  //   : `/api/courses/${courseId}/submissions`;
  // const response = await fetch(url, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return [];
}

export async function gradeTaskSubmission(
  submissionId: string,
  score: number,
  feedback: string
): Promise<{
  success: boolean;
  message: string;
}> {
  await delay(600);

  // Backend integration: Save grade and feedback to database
  // const response = await fetch(`/api/submissions/${submissionId}/grade`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify({ score, feedback })
  // });

  return { success: true, message: "Оценка выставлена" };
}

export async function getClassProgress(courseId: string): Promise<{
  totalStudents: number;
  averageProgress: number;
  studentProgress: Array<{
    studentId: string;
    name: string;
    progress: number;
  }>;
}> {
  await delay(800);

  // Backend integration: Fetch aggregated progress statistics for all students in course
  // const response = await fetch(`/api/courses/${courseId}/progress/stats`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return {
    totalStudents: 0,
    averageProgress: 0,
    studentProgress: []
  };
}

export async function getCourseLessons(courseId: string): Promise<any[]> {
  await delay(500);

  // Backend integration: Fetch all lessons in course with module structure
  // const response = await fetch(`/api/courses/${courseId}/lessons`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return [];
}

export async function sendMessageToStudent(
  studentId: string,
  message: string
): Promise<{
  success: boolean;
  messageId: string;
}> {
  await delay(400);

  // Backend integration: Store teacher message in chat/notification system
  // const response = await fetch('/api/messages', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify({ studentId, message, senderRole: 'teacher' })
  // });

  return { success: true, messageId: `msg${Date.now()}` };
}