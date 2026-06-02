import { students } from "@/entities/student/model/students"
import delay from "./delay"

export function getStudentById(id: string) {
  return students.find((s) => s.id === id)
}

export async function getStudentBalance(studentId: string): Promise<{
  studentId: string;
  balance: number;
  currency: string;
}> {
  await delay(300);

  // Backend integration: Fetch student's account balance from database
  // const response = await fetch(`/api/students/${studentId}/balance`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  const student = students.find(s => s.id === studentId);
  return {
    studentId,
    balance: student?.balance || 0,
    currency: 'RUB'
  };
}

export async function updateStudentInfo(studentId: string, data: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}): Promise<{ success: boolean; message: string }> {
  await delay(500);

  // Backend integration: Update student profile information
  // const response = await fetch(`/api/students/${studentId}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify(data)
  // });

  return { success: true, message: "Профиль студента обновлен" };
}

export const studentApi = {
  getStudentById,
  getStudentBalance,
  updateStudentInfo,
}