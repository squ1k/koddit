import { parents } from "@/entities/parent/model/parents"

export function getParentById(id: string) {
  return parents.find((p) => p.id === id)
}

export const parentApi = {
  getParentById,
}