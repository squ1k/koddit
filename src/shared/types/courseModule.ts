export interface CourseModule {

  id: string

  courseId: string

  title: string

  order: number

  annotation?: string

}

export interface Lesson {

  id: string

  moduleId: string

  title: string

  order: number

  summary: string

  content?: string

  isCompleted: boolean

}

export interface LessonAttendance {

  lessonId: string

  studentId: string

  attended: boolean

  date: string

}

export interface Task {

  id: string

  lessonId: string

  title: string

  description: string

  content?: string

  order: number

  isCompleted: boolean

  hasFileUpload?: boolean

  hasTextAnswer?: boolean

  maxFileSizeMB?: number

  allowedFileTypes?: string[]

}

export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface QuizQuestion {
  id: string
  text: string
  options: QuizOption[]
}

export interface Quiz {

  id: string

  lessonId: string

  title: string

  order: number

  questions: QuizQuestion[]

  content?: string

  isCompleted: boolean

}

export interface CourseSchedule {
  day: string
  time: string
}

export interface NewCourse {
  id: string
  title: string
  teacherId: string
  lessonsCount: number
  startDate: string
  price: number
  schedule: CourseSchedule[]
  description?: string
  modules?: NewModule[]
}

export interface NewModule {
  id: string
  courseId: string
  title: string
  order: number
  annotation?: string
  lessons?: NewLesson[]
  tasks?: NewTask[]
  quizzes?: NewQuiz[]
}

export interface NewLesson {
  id: string
  moduleId: string
  title: string
  order: number
  summary: string
  content: string
}

export interface NewTask {
  id: string
  lessonId: string
  title: string
  description: string
  content: string
  order: number
  hasFileUpload: boolean
  hasTextAnswer: boolean
  maxFileSizeMB?: number
  allowedFileTypes?: string[]
}

export interface NewQuiz {
  id: string
  lessonId: string
  title: string
  order: number
  questions: NewQuizQuestion[]
  content: string
}

export interface NewQuizQuestion {
  id: string
  text: string
  options: QuizOption[]
}

export interface StudentSubmission {
  id: string
  taskId: string
  studentId: string
  textAnswer?: string
  fileUrl?: string
  submittedAt: string
  graded: boolean
  grade?: number
  feedback?: string
}

export interface QuizSubmission {
  id: string
  quizId: string
  studentId: string
  answers: Record<string, string>
  score: number
  totalQuestions: number
  submittedAt: string
}