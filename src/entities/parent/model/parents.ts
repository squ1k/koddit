import type { Parent } from "@/shared/types/parent";

export const parents: Parent[] = [

  {
    id: "p1",
    childrenIds: ["s1", "s3"],
    parentName: "Иван Петров",
    phone: "+7 999 123-45-67",
    email: "ivan.petrov@mail.ru",
    telegram: "@ivan_petrov"
  },

  {
    id: "p2",
    childrenIds: ["s2"],
    parentName: "Мария Сидорова",
    phone: "+7 999 234-56-78",
    email: "maria.sidorova@mail.ru",
    telegram: "@maria_s"
  },

  {
    id: "p3",
    childrenIds: ["s4"],
    parentName: "Алексей Волков",
    phone: "+7 999 345-67-89",
    email: "alex.volkov@mail.ru",
    telegram: "@alex_v"
  }

];

export function addParent(parent: Parent) {
  parents.push(parent);
}
