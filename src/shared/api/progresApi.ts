import { courseProgress } from "@/entities/progress/model/courseProgress"
import delay from "./delay"

export function getProgressByEnrollment(enrollmentId: string) {
  return courseProgress.find(p => p.enrollmentId === enrollmentId)
}

// API для обновления прогресса курса
export async function updateCourseProgress(enrollmentId: string, progressData: {
  progress: number; // Процент завершения (0-100)
  correctPercent: number; // Процент правильных ответов
  completedLessons?: string[]; // ID завершенных уроков
  lastActivity?: string; // Дата последней активности
}): Promise<{ success: boolean; message: string }> {
  await delay(800);

  // В будущем здесь будет вызов бэкэнда
  // const response = await fetch(`/api/progress/${enrollmentId}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(progressData)
  // });

  console.log(`Updating progress for enrollment ${enrollmentId}:`, progressData);

  // Имитация обновления (в реальности данные сохранятся на бэкэнде)
  return { success: true, message: "Прогресс успешно обновлен" };
}

// API для получения детального прогресса по курсу
export async function getDetailedProgress(enrollmentId: string): Promise<{
  enrollmentId: string;
  overallProgress: number;
  correctPercent: number;
  lessonsProgress: Array<{
    lessonId: string;
    completed: boolean;
    quizScore?: number;
    tasksSubmitted?: number;
  }>;
  lastActivity: string;
} | null> {
  await delay(600);

  // В будущем: const response = await fetch(`/api/progress/${enrollmentId}/detailed`);

  const basicProgress = getProgressByEnrollment(enrollmentId);
  if (!basicProgress) return null;

  // Имитация детального прогресса
  return {
    enrollmentId,
    overallProgress: basicProgress.progress,
    correctPercent: basicProgress.correctPercent,
    lessonsProgress: [
      { lessonId: 'l1', completed: true, quizScore: 85 },
      { lessonId: 'l2', completed: true, quizScore: 90 },
      { lessonId: 'l3', completed: false, tasksSubmitted: 1 }
    ],
    lastActivity: new Date().toISOString()
  };
}