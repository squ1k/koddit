import type { Student } from "@/shared/types/student";

export const students: Student[] = [

  {
    id: "s1",
    birthDate: "2010-05-12",
    balance: 1500,
    parentId: "p1"
  },

  {
    id: "s2",
    birthDate: "2011-03-22",
    balance: 800,
    parentId: "p2"
  }

];

export function addStudent(student: Student) {
  students.push(student);
}
