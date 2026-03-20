type Props = {
  title: string
  teacher: string
}

export default function CourseCard({ title, teacher }: Props) {

  return (

    <div className="course-card">

      <div className="course-title">
        {title}
      </div>

      <div className="course-teacher">
        {teacher}
      </div>

    </div>

  )

}