import { parents } from "@/entities/parent/model/parents"
import delay from "./delay"

export function getParentById(id: string) {
  return parents.find((p) => p.id === id)
}

export async function getChildProgress(childStudentId: string): Promise<{
  studentName: string;
  enrolledCourses: number;
  averageScore: number;
  recentActivity: Array<{
    date: string;
    course: string;
    activity: string;
    score?: number;
  }>;
}> {
  await delay(600);

  // Backend integration: Fetch child's learning progress and statistics
  // const response = await fetch(`/api/parents/children/${childStudentId}/progress`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return {
    studentName: "",
    enrolledCourses: 0,
    averageScore: 0,
    recentActivity: []
  };
}

export async function getChildGrades(childStudentId: string): Promise<{
  enrollmentId: string;
  courseName: string;
  grades: Array<{
    taskId: string;
    score: number;
    maxScore: number;
    date: string;
  }>;
}[]> {
  await delay(700);

  // Backend integration: Fetch all child's grades and marks for courses
  // const response = await fetch(`/api/parents/children/${childStudentId}/grades`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return [];
}

export async function getChildActivity(
  childStudentId: string,
  days: number = 7
): Promise<Array<{
  date: string;
  activity: string;
  details: string;
  completed: boolean;
}>> {
  await delay(500);

  // Backend integration: Fetch recent activity log for child
  // const response = await fetch(`/api/parents/children/${childStudentId}/activity?days=${days}`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return [];
}

export async function getChildEnrollments(childStudentId: string): Promise<any[]> {
  await delay(400);

  // Backend integration: Fetch all course enrollments for child
  // const response = await fetch(`/api/parents/children/${childStudentId}/enrollments`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return [];
}

export async function sendMessageToTeacher(
  childStudentId: string,
  teacherId: string,
  message: string
): Promise<{
  success: boolean;
  messageId: string;
}> {
  await delay(400);

  // Backend integration: Store parent message to teacher
  // const response = await fetch('/api/messages', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify({ teacherId, message, senderRole: 'parent', childStudentId })
  // });

  return { success: true, messageId: `msg${Date.now()}` };
}