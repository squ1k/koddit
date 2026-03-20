import type { User } from "@/shared/types/user"

export function getUserFullName(user: User) {
  return `${user.firstName} ${user.lastName}`
}

export function getUserFirstLetter(user: User) {
  return user.firstName[0]
}

export function isStudent(user: User) {
  return user.role === "Ученик"
}

export function isTeacher(user: User) {
  return user.role === "Учитель"
}

export function isParent(user: User) {
  return user.role === "Родитель"
}