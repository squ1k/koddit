import delay from "./delay"

export async function getQuizzesByLesson(lessonId: string): Promise<any[]> {
  await delay(300);

  // Backend integration: Fetch all quizzes for a lesson from server
  // const response = await fetch(`/api/lessons/${lessonId}/quizzes`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return [];
}

export async function createQuiz(lessonId: string, quizData: {
  title: string;
  order: number;
  questions: any[];
}): Promise<{ success: boolean; quizId: string; message: string }> {
  await delay(500);

  // Backend integration: Create new quiz in lesson database
  // const response = await fetch(`/api/lessons/${lessonId}/quizzes`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify(quizData)
  // });

  return {
    success: true,
    quizId: `quiz${Date.now()}`,
    message: "Тест успешно создан"
  };
}

export async function updateQuiz(quizId: string, quizData: any): Promise<{
  success: boolean;
  message: string;
}> {
  await delay(400);

  // Backend integration: Update quiz information on server
  // const response = await fetch(`/api/quizzes/${quizId}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify(quizData)
  // });

  return { success: true, message: "Тест успешно обновлен" };
}

export async function deleteQuiz(quizId: string): Promise<{
  success: boolean;
  message: string;
}> {
  await delay(400);

  // Backend integration: Delete quiz from server database
  // const response = await fetch(`/api/quizzes/${quizId}`, {
  //   method: 'DELETE',
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return { success: true, message: "Тест успешно удален" };
}