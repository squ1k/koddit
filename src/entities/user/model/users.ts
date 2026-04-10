import type { User } from "@/shared/types/user";

export const users: User[] = [

  {
    id: "u1",
    role: "Ученик",
    profileId: "s1",

    firstName: "Алексей",
    lastName: "Иванов",

    phone: "+7 992 346-65-45",
    email: "alexey@mail.ru",
    telegram: "@alexey",

    password: "pass123"
  },

  {
    id: "u2",
    role: "Ученик",
    profileId: "s2",

    firstName: "Максим",
    lastName: "Смирнов",

    phone: "+7 912 555-33-22",
    email: "max@mail.ru",
    telegram: "@max",

    password: "pass123"
  },

  {
    id: "u3",
    role: "Родитель",
    profileId: "p1",

    firstName: "Марина",
    lastName: "Иванова",

    phone: "+7 999 555-44-33",
    email: "marina@mail.ru",
    telegram: "@marina",

    password: "parent123"
  },

  {
    id: "u4",
    role: "Родитель",
    profileId: "p2",

    firstName: "Ольга",
    lastName: "Смирнова",

    phone: "+7 999 222-11-00",
    email: "olga@mail.ru",
    telegram: "@olga",

    password: "parent123"
  },

  {
    id: "u5",
    role: "Учитель",
    profileId: "t1",

    firstName: "Дмитрий",
    lastName: "Петров",

    phone: "+7 900 111-22-33",
    email: "petrov@mail.ru",
    telegram: "@petrov",

    password: "teach123"
  },

  {
    id: "u6",
    role: "Учитель",
    profileId: "t2",

    firstName: "Анна",
    lastName: "Кузнецова",

    phone: "+7 900 888-44-22",
    email: "anna@mail.ru",
    telegram: "@anna",

    password: "teach123"
  },

  {
    id: "u7",
    role: "Администратор",
    profileId: "a1",

    firstName: "Иван",
    lastName: "Соколов",

    phone: "+7 999 777-00-01",
    email: "admin@mail.ru",
    telegram: "@admin",

    password: "admin123"
  }

];

const rolePrefixMap: Record<User["role"], string> = {
  Ученик: "s",
  Родитель: "p",
  Учитель: "t",
  Администратор: "a",
};

export function generateUserId() {
  const usedIds = new Set(users.map((user) => user.id));
  let nextIndex = users.length + 1;

  while (usedIds.has(`u${nextIndex}`)) {
    nextIndex += 1;
  }

  return `u${nextIndex}`;
}

export function generateProfileId(role: User["role"]) {
  const prefix = rolePrefixMap[role];
  const usedIds = new Set(users.map((user) => user.profileId));
  let nextIndex = 1;

  while (usedIds.has(`${prefix}${nextIndex}`)) {
    nextIndex += 1;
  }

  return `${prefix}${nextIndex}`;
}

export function addUser(user: User) {
  users.push(user);
}
