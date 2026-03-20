import { parents } from "./parents";
import type { Parent } from "@/shared/types/parent";

export function getParentChildrenIds(parent: Parent) {
  return parent.childrenIds;
}

export function getParentById(parentId: string): Parent | undefined {
  return parents.find((p) => p.id === parentId);
}

export function getParentChildrenIdsByParentId(parentId: string) {
  const parent = getParentById(parentId);
  return parent ? parent.childrenIds : [];
}
