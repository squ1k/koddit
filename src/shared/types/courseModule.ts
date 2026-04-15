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