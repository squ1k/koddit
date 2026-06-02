import { lessons } from "@/entities/lesson/model/lessons"
import { saveQuizResult, getQuizResult as getStoredQuizResult } from "@/app/store/store"
import delay from "./delay"
import type { Lesson, LessonData, TaskAnswer } from "@/shared/types/lesson"

export function getLessonsByModule(moduleId: string): Lesson[] {
  return lessons.filter(l => l.moduleId === moduleId)
}

export async function getLessonById(lessonId: string): Promise<Lesson | null> {
  await delay(300);

  // Backend integration: Fetch lesson details from server
  // const response = await fetch(`/api/lessons/${lessonId}`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return lessons.find(l => l.id === lessonId) || null;
}

export async function createLesson(_moduleId: string, _lessonData: LessonData): Promise<{ success: boolean; lessonId: string; message: string }> {
  await delay(500);

  // Backend integration: Create new lesson in database
  // const response = await fetch(`/api/modules/${_moduleId}/lessons`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify(_lessonData)
  // });

  return {
    success: true,
    lessonId: `l${Date.now()}`,
    message: "Урок успешно создан"
  };
}

export async function updateLesson(_lessonId: string, _lessonData: LessonData): Promise<{
  success: boolean;
  message: string;
}> {
  await delay(400);

  // Backend integration: Update lesson information on server
  // const response = await fetch(`/api/lessons/${_lessonId}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify(_lessonData)
  // });

  return { success: true, message: "Урок успешно обновлен" };
}

export async function deleteLesson(_lessonId: string): Promise<{
  success: boolean;
  message: string;
}> {
  await delay(400);

  // Backend integration: Delete lesson from server database
  // const response = await fetch(`/api/lessons/${_lessonId}`, {
  //   method: 'DELETE',
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return { success: true, message: "Урок успешно удален" };
}

export async function markLessonComplete(_lessonId: string, _studentId: string): Promise<{
  success: boolean;
  message: string;
}> {
  await delay(400);

  // Backend integration: Mark lesson as completed for student
  // const response = await fetch(`/api/lessons/${_lessonId}/complete`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify({ studentId: _studentId })
  // });

  return { success: true, message: "Урок отмечен как завершенный" };
}

export async function uploadTaskFile(
  taskId: string,
  studentId: string,
  file: File
): Promise<{
  success: boolean;
  fileUrl: string;
  message: string;
}> {
  await delay(2000);

  // Backend integration: Send file to server and store it in database
  // const formData = new FormData();
  // formData.append('file', file);
  // formData.append('taskId', taskId);
  // formData.append('studentId', studentId);
  // const response = await fetch('/api/tasks/upload', {
  //   method: 'POST',
  //   body: formData
  // });

  const maxSizeMB = 10;
  if (file.size > maxSizeMB * 1024 * 1024) {
    return {
      success: false,
      fileUrl: '',
      message: `Файл слишком большой. Максимальный размер: ${maxSizeMB}MB`
    };
  }

  const allowedTypes = ['.pdf', '.doc', '.docx', '.txt', '.zip'];
  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  if (!allowedTypes.includes(fileExtension)) {
    return {
      success: false,
      fileUrl: '',
      message: `Недопустимый тип файла. Разрешенные типы: ${allowedTypes.join(', ')}`
    };
  }

  const fileUrl = `https://storage.example.com/tasks/${taskId}/${studentId}/${file.name}`;

  return {
    success: true,
    fileUrl,
    message: "Файл успешно загружен"
  };
}

export async function submitTaskAnswer(_taskId: string, _studentId: string, _answer: TaskAnswer): Promise<{ success: boolean; message: string }> {
  await delay(1000);

  // Backend integration: Send task answer to server for review
  // const response = await fetch('/api/tasks/submit', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ taskId: _taskId, studentId: _studentId, answer: _answer })
  // });

  return { success: true, message: "Ответ успешно отправлен" };
}

export async function submitQuizAnswers(quizId: string, _studentId: string, answers: Record<string, string>): Promise<{
  success: boolean;
  correctCount: number;
  total: number;
  results: Record<string, boolean>;
}> {
  await delay(1500);

  // Backend integration: Submit quiz answers and get automatic verification results
  // const response = await fetch('/api/quizzes/submit', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ quizId, studentId: _studentId, answers })
  // });
  // const result = await response.json();

  const mockResults: Record<string, boolean> = {};
  let correctCount = 0;

  const correctAnswers: Record<string, string> = {
    'q1': 'opt1',
    'q2': 'opt2',
    'q3': 'opt1'
  };

  Object.entries(answers).forEach(([questionId, selectedOption]) => {
    const isCorrect = correctAnswers[questionId] === selectedOption;
    mockResults[questionId] = isCorrect;
    if (isCorrect) correctCount++;
  });

  const total = Object.keys(answers).length;

  saveQuizResult(quizId, correctCount, total);

  return {
    success: true,
    correctCount,
    total,
    results: mockResults
  };
}

export async function getQuizResults(quizId: string, _studentId: string): Promise<{
  quizId: string;
  correctCount: number;
  total: number;
  percentage: number;
} | null> {
  await delay(500);

  // Backend integration: Fetch quiz results from server
  // const response = await fetch(`/api/quizzes/${quizId}/results?studentId=${_studentId}`);
  // const result = await response.json();

  const result = getStoredQuizResult(quizId);

  if (!result) return null;

  return {
    quizId: result.quizId,
    correctCount: parseInt(result.correctCount),
    total: parseInt(result.total),
    percentage: Math.round((parseInt(result.correctCount) / parseInt(result.total)) * 100)
  };
}