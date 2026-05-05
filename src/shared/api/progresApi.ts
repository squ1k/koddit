import { courseProgress } from "@/entities/progress/model/courseProgress"
import delay from "./delay"

export function getProgressByEnrollment(enrollmentId: string) {
  return courseProgress.find(p => p.enrollmentId === enrollmentId)
}

export async function updateCourseProgress(enrollmentId: string, progressData: {
  progress: number;
  correctPercent: number;
  completedLessons?: string[];
  lastActivity?: string;
}): Promise<{ success: boolean; message: string }> {
  await delay(800);

  // Backend integration: Update student's course progress on server
  // const response = await fetch(`/api/progress/${enrollmentId}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(progressData)
  // });

  return { success: true, message: "Прогресс успешно обновлен" };
}

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

  // Backend integration: Fetch detailed progress breakdown from server
  // const response = await fetch(`/api/progress/${enrollmentId}/detailed`);
  // const data = await response.json();

  const basicProgress = getProgressByEnrollment(enrollmentId);
  if (!basicProgress) return null;

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