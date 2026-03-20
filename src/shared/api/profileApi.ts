import { studentApi } from "./studentApi"
import { parentApi } from "./parentApi"
import { teacherApi } from "./teacherApi"

import type { User } from "../types/user"

export async function getProfile(user: User) {

  switch (user.role) {

    case "Ученик":
      console.log(user.profileId)
      return studentApi.getStudentById(user.profileId)

    case "Родитель":
      return parentApi.getParentById(user.profileId)

    case "Учитель":
      return teacherApi.getTeacherById(user.profileId)

  }

}