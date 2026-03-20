export type Role =
  | "Ученик"
  | "Родитель"
  | "Учитель"
  | "Администратор"

export interface User {

  id: string
  role: Role
  profileId: string

  firstName: string
  lastName: string

  phone: string
  email: string
  telegram: string

  password: string

}