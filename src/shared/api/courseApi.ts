import { courses } from "@/entities/course/model/courses"
import { enrollments } from "@/entities/enrollment/model/enrollments"
import delay from "./delay"

export function getCourseById(courseId: string) {
  return courses.find((c) => c.id === courseId)
}

export function getCoursesByTeacher(teacherId: string) {
  return courses.filter((c) => c.teacherId === teacherId)
}

export function getCoursesByStudent(studentId: string) {
  const studentEnrollments = enrollments.filter(
    (e) => e.studentId === studentId
  )

  return studentEnrollments.map((e) =>
    courses.find((c) => c.id === e.courseId),
  )
}

export async function getAllCourses(limit: number = 10, offset: number = 0): Promise<{
  courses: any[];
  total: number;
}> {
  await delay(400);

  // Backend integration: Fetch paginated list of courses from server
  // const response = await fetch(`/api/courses?limit=${limit}&offset=${offset}`);
  // const data = await response.json();

  return {
    courses: courses.slice(offset, offset + limit),
    total: courses.length
  };
}

export async function createCourse(courseData: {
  title: string;
  description: string;
  price: number;
  teacherId: string;
  category: string;
}): Promise<{ success: boolean; courseId: string; message: string }> {
  await delay(600);

  // Backend integration: Create new course on server and save to database
  // const response = await fetch('/api/courses', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify(courseData)
  // });

  return {
    success: true,
    courseId: `c${Date.now()}`,
    message: "Курс успешно создан"
  };
}

export async function updateCourse(courseId: string, courseData: any): Promise<{
  success: boolean;
  message: string;
}> {
  await delay(500);

  // Backend integration: Update course information on server
  // const response = await fetch(`/api/courses/${courseId}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify(courseData)
  // });

  return { success: true, message: "Курс успешно обновлен" };
}

export async function deleteCourse(courseId: string): Promise<{
  success: boolean;
  message: string;
}> {
  await delay(500);

  // Backend integration: Delete course from server database
  // const response = await fetch(`/api/courses/${courseId}`, {
  //   method: 'DELETE',
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return { success: true, message: "Курс успешно удален" };
}

export const courseApi = {
  getCourseById,
  getCoursesByTeacher,
  getCoursesByStudent,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
}