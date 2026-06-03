export interface Lesson {
  id: string
  moduleId: string
  title: string
  order: number
}

export interface LessonData {
  title: string
  order: number
  summary: string
  content?: string
}

export interface TaskAnswer {
  textAnswer?: string
  fileUrl?: string
}