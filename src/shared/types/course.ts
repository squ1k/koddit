export interface Course {

  id: string

  title: string

  teacherId: string

  lessonsCount: number

  schedule: {
    day: string
    time: string
  }[]

}