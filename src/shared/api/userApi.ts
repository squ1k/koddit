import { users } from "@/entities/user/model/users"

export function getUserById(userId: string) {
  return users.find(u => u.id === userId)
}

export function getUserByPhone(phone: string) {
  return users.find(u => u.phone === phone)
}