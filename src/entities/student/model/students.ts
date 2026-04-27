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
  },

  {
    id: "s3",
    birthDate: "2009-08-15",
    balance: 2000,
    parentId: "p1"
  },

  {
    id: "s4",
    birthDate: "2012-01-10",
    balance: 500,
    parentId: "p3"
  }

];

export function addStudent(student: Student) {
  students.push(student);
}

export function updateStudentBalance(studentId: string, newBalance: number) {
  const student = students.find(s => s.id === studentId);
  if (student) {
    student.balance = newBalance;
  }
}
