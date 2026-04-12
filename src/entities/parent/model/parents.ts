import type { Parent } from "@/shared/types/parent";

export const parents: Parent[] = [

  {
    id: "p1",
    childrenIds: ["s1", "s3"]
  },

  {
    id: "p2",
    childrenIds: ["s2"]
  },

  {
    id: "p3",
    childrenIds: ["s4"]
  }

];

export function addParent(parent: Parent) {
  parents.push(parent);
}
