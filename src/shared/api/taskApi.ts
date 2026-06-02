import delay from "./delay"

export type Task = {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  order: number;
  hasFileUpload?: boolean;
  hasTextAnswer?: boolean;
  maxFileSizeMB?: number;
  allowedFileTypes?: string[];
};

export type TaskCreateData = Omit<Task, "id" | "lessonId">;

export type TaskUpdateData = Partial<TaskCreateData>;

export type TaskAnswer = {
  taskId: string;
  studentId: string;
  answerText: string;
  submittedAt: string;
  attachments?: string[];
};

export async function getTasksByLesson(lessonId: string): Promise<Task[]> {
  await delay(300);

  const requestUrl = `/api/lessons/${lessonId}/tasks`;
  void requestUrl;

  // Backend integration: Fetch all tasks for a lesson from server
  // const response = await fetch(requestUrl, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return [];
}

export async function createTask(lessonId: string, taskData: TaskCreateData): Promise<{ success: boolean; taskId: string; message: string }> {
  await delay(500);

  const createdTaskId = `${lessonId}-task-${Date.now()}`;
  void taskData;

  // Backend integration: Create new task in lesson database
  // const response = await fetch(`/api/lessons/${lessonId}/tasks`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify(taskData)
  // });

  return {
    success: true,
    taskId: createdTaskId,
    message: "Задание успешно создано"
  };
}

export async function updateTask(taskId: string, taskData: TaskUpdateData): Promise<{
  success: boolean;
  message: string;
}> {
  await delay(400);

  void taskData;

  // Backend integration: Update task information on server
  // const response = await fetch(`/api/tasks/${taskId}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   body: JSON.stringify(taskData)
  // });

  return { success: true, message: `Задание ${taskId} успешно обновлено` };
}

export async function deleteTask(taskId: string): Promise<{
  success: boolean;
  message: string;
}> {
  await delay(400);

  // Backend integration: Delete task from server database
  // const response = await fetch(`/api/tasks/${taskId}`, {
  //   method: 'DELETE',
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return { success: true, message: `Задание ${taskId} успешно удалено` };
}

export async function getTaskAnswer(taskId: string, studentId: string): Promise<TaskAnswer | null> {
  await delay(300);

  const requestUrl = `/api/tasks/${taskId}/answer?studentId=${studentId}`;
  void requestUrl;

  // Backend integration: Fetch student's task submission from server
  // const response = await fetch(requestUrl, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });

  return null;
}