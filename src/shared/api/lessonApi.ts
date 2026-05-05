import { saveQuizResult } from "@/app/store/store"
import delay from "./delay"

export async function uploadTaskFile(taskId: string, studentId: string, file: File): Promise<{
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

export async function submitTaskAnswer(taskId: string, studentId: string, answer: {
  textAnswer?: string;
  fileUrl?: string;
}): Promise<{ success: boolean; message: string }> {
  await delay(1000);

  // Backend integration: Send task answer to server for review
  // const response = await fetch('/api/tasks/submit', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ taskId, studentId, answer })
  // });

  return { success: true, message: "Ответ успешно отправлен" };
}

export async function submitQuizAnswers(quizId: string, studentId: string, answers: Record<string, string>): Promise<{
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
  //   body: JSON.stringify({ quizId, studentId, answers })
  // });
  // const result = await response.json();

  const mockResults: Record<string, boolean> = {};
  let correctCount = 0;

  const correctAnswers = {
    'q1': 'opt1',
    'q2': 'opt2',
    'q3': 'opt1'
  };

  Object.entries(answers).forEach(([questionId, selectedOption]) => {
    const isCorrect = correctAnswers[questionId as keyof typeof correctAnswers] === selectedOption;
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

export async function getQuizResults(quizId: string, studentId: string): Promise<{
  quizId: string;
  correctCount: number;
  total: number;
  percentage: number;
} | null> {
  await delay(500);

  // Backend integration: Fetch quiz results from server
  // const response = await fetch(`/api/quizzes/${quizId}/results?studentId=${studentId}`);
  // const result = await response.json();

  const { getQuizResult } = await import("@/app/store/store");
  const result = getQuizResult(quizId);

  if (!result) return null;

  return {
    quizId: result.quizId,
    correctCount: parseInt(result.correctCount),
    total: parseInt(result.total),
    percentage: Math.round((parseInt(result.correctCount) / parseInt(result.total)) * 100)
  };
}