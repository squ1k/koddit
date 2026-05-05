import { saveQuizResult } from "@/app/store/store"
import delay from "./delay"

// API для загрузки файла задания
export async function uploadTaskFile(taskId: string, studentId: string, file: File): Promise<{
  success: boolean;
  fileUrl: string;
  message: string;
}> {
  await delay(2000); // Имитация загрузки файла

  // В будущем здесь будет загрузка на сервер
  // const formData = new FormData();
  // formData.append('file', file);
  // formData.append('taskId', taskId);
  // formData.append('studentId', studentId);
  // const response = await fetch('/api/tasks/upload', {
  //   method: 'POST',
  //   body: formData
  // });

  // Проверка размера файла (имитация)
  const maxSizeMB = 10; // Максимальный размер файла
  if (file.size > maxSizeMB * 1024 * 1024) {
    return {
      success: false,
      fileUrl: '',
      message: `Файл слишком большой. Максимальный размер: ${maxSizeMB}MB`
    };
  }

  // Проверка типа файла (имитация)
  const allowedTypes = ['.pdf', '.doc', '.docx', '.txt', '.zip'];
  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  if (!allowedTypes.includes(fileExtension)) {
    return {
      success: false,
      fileUrl: '',
      message: `Недопустимый тип файла. Разрешенные типы: ${allowedTypes.join(', ')}`
    };
  }

  // Имитация успешной загрузки
  const fileUrl = `https://storage.example.com/tasks/${taskId}/${studentId}/${file.name}`;

  console.log(`File uploaded for task ${taskId}: ${fileUrl}`);

  return {
    success: true,
    fileUrl,
    message: "Файл успешно загружен"
  };
}

// API для отправки ответа на задачу
export async function submitTaskAnswer(taskId: string, studentId: string, answer: {
  textAnswer?: string;
  fileUrl?: string;
}): Promise<{ success: boolean; message: string }> {
  await delay(1000); // Имитация задержки сети

  // В будущем здесь будет вызов бэкэнда
  // const response = await fetch('/api/tasks/submit', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ taskId, studentId, answer })
  // });

  console.log(`Submitting task ${taskId} for student ${studentId}:`, answer);

  // Имитация успешной отправки
  return { success: true, message: "Ответ успешно отправлен" };
}

// API для проверки квиза
export async function submitQuizAnswers(quizId: string, studentId: string, answers: Record<string, string>): Promise<{
  success: boolean;
  correctCount: number;
  total: number;
  results: Record<string, boolean>;
}> {
  await delay(1500); // Имитация задержки проверки

  console.log(`Checking quiz ${quizId} for student ${studentId}`);

  // В будущем здесь будет вызов бэкэнда для проверки ответов
  // const response = await fetch('/api/quizzes/submit', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ quizId, studentId, answers })
  // });
  // const result = await response.json();

  // Имитация проверки (простая логика для демонстрации)
  const mockResults: Record<string, boolean> = {};
  let correctCount = 0;

  // Предполагаем, что правильные ответы известны (в реальности придут с бэкэнда)
  const correctAnswers = {
    'q1': 'opt1', // Пример правильных ответов
    'q2': 'opt2',
    'q3': 'opt1'
  };

  Object.entries(answers).forEach(([questionId, selectedOption]) => {
    const isCorrect = correctAnswers[questionId as keyof typeof correctAnswers] === selectedOption;
    mockResults[questionId] = isCorrect;
    if (isCorrect) correctCount++;
  });

  const total = Object.keys(answers).length;

  // Сохраняем результат в store
  saveQuizResult(quizId, correctCount, total);

  return {
    success: true,
    correctCount,
    total,
    results: mockResults
  };
}

// API для получения результатов квиза
export async function getQuizResults(quizId: string, studentId: string): Promise<{
  quizId: string;
  correctCount: number;
  total: number;
  percentage: number;
} | null> {
  await delay(500);

  console.log(`Loading quiz results for quiz ${quizId}, student ${studentId}`);

  // В будущем: const response = await fetch(`/api/quizzes/${quizId}/results?studentId=${studentId}`);

  // Имитация получения результатов из store
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