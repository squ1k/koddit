# Koddit - Образовательная платформа

Современная образовательная платформа на React 18 с TypeScript для управления курсами, уроками, заданиями и квизами.

## 🎯 Функциональность

### Для студентов

- ✅ Просмотр каталога курсов
- ✅ Регистрация на курсы
- ✅ Прохождение модулей и уроков
- ✅ Выполнение заданий с загрузкой файлов
- ✅ Прохождение квизов с автоматической проверкой
- ✅ Отслеживание прогресса обучения
- ✅ Пополнение баланса и оплата курсов
- ✅ Чат с преподавателями

### Для преподавателей

- ✅ Создание и управление курсами
- ✅ Добавление модулей и уроков
- ✅ Создание заданий и квизов
- ✅ Проверка работ студентов и выставление оценок
- ✅ Отслеживание прогресса класса
- ✅ Отправка сообщений студентам

### Для родителей

- ✅ Мониторинг прогресса ребенка
- ✅ Просмотр оценок и статистики
- ✅ Отслеживание активности
- ✅ Общение с преподавателями

## 🛠 Технологический стек

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router 6
- **State Management**: useSyncExternalStore (минимальный паттерн)
- **Testing**: Vitest + @testing-library/react
- **Styling**: CSS (пользовательские утилиты)
- **API**: REST API с поддержкой JWT токенов

## 📁 Архитектура проекта

Проект использует **Feature-Sliced Design (FSD)** архитектуру:

```
src/
├── app/                    # Прикладной уровень
│   ├── main.tsx           # Точка входа
│   ├── App.tsx            # Главный компонент
│   ├── store/             # Глобальное состояние
│   ├── router/            # Маршрутизация
│   └── layout/            # Макеты страниц
├── entities/              # Бизнес-сущности (модели данных)
├── features/              # Используемые функции (auth, payment)
├── pages/                 # Страницы приложения
├── shared/                # Общие ресурсы
│   ├── api/              # API клиент
│   ├── types/            # TypeScript типы
│   ├── ui/               # UI компоненты
│   ├── hooks/            # Custom hooks
│   └── utils/            # Утилиты
└── widgets/              # Мини-компоненты
```

## 🔌 API Структура

### Основные модули API

| Модуль          | Описание                         | Статус   |
| --------------- | -------------------------------- | -------- |
| `authApi`       | Аутентификация и авторизация     | ✅ Ready |
| `userApi`       | Управление профилем пользователя | ✅ Ready |
| `courseApi`     | CRUD операции с курсами          | ✅ Ready |
| `moduleApi`     | Управление модулями курса        | ✅ Ready |
| `lessonApi`     | Уроки, загрузка файлов, квизы    | ✅ Ready |
| `taskApi`       | Задания и ответы студентов       | ✅ Ready |
| `quizApi`       | Квизы и результаты               | ✅ Ready |
| `enrollmentApi` | Регистрация на курсы             | ✅ Ready |
| `progresApi`    | Отслеживание прогресса           | ✅ Ready |
| `studentApi`    | Профиль и статистика студента    | ✅ Ready |
| `teacherApi`    | API для преподавателей           | ✅ Ready |
| `parentApi`     | API для родителей                | ✅ Ready |
| `chatApi`       | Система чатов                    | ✅ Ready |
| `messageApi`    | Управление сообщениями           | ✅ Ready |

### Документация API

- **[API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md)** - Полное руководство интеграции
- **[API_ENDPOINTS_REFERENCE.md](./API_ENDPOINTS_REFERENCE.md)** - Краткая справка по endpoint'ам

## 🚀 Быстрый старт

### Требования

- Node.js 18+
- npm или yarn

### Установка зависимостей

```bash
npm install
```

### Разработка

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

### Сборка для production

```bash
npm run build
```

### Запуск тестов

```bash
npm run test
```

## 📊 Структура данных

### Роли пользователей

- `student` - Студент
- `teacher` - Преподаватель
- `parent` - Родитель
- `admin` - Администратор

### Основные типы данных

```typescript
interface User {
    id: string;
    phone: string;
    role: "student" | "teacher" | "parent" | "admin";
    profileId?: string;
    firstName?: string;
    lastName?: string;
}

interface Course {
    id: string;
    title: string;
    description: string;
    teacherId: string;
    price: number;
    duration: number; // в днях
    category: string;
    image?: string;
}

interface Enrollment {
    id: string;
    studentId: string;
    courseId: string;
    enrolledDate: string;
    status: "active" | "completed" | "paused";
    paidUntil?: string;
}

interface Quiz {
    id: string;
    lessonId: string;
    title: string;
    questions: QuizQuestion[];
    passingScore: number; // процент
}

interface Task {
    id: string;
    lessonId: string;
    title: string;
    description: string;
    fileRequired?: boolean;
}
```

## 💾 Локальное хранилище

### localStorage (Постоянное)

- `token` - JWT токен авторизации
- `user` - Информация о текущем пользователе
- `balance` - Баланс счета студента
- `enrollments` - Записи студента на курсы

### sessionStorage (Временное)

- `quizResults` - Результаты квизов за сеанс
- `viewedContent` - Просмотренный контент
- `messages` - Сообщения в чате

## 🔒 Безопасность

- **JWT Authentication** - Все запросы требуют токена
- **RBAC** - Контроль доступа на основе ролей
- **CORS** - Настроенная кросс-доменная политика
- **HTTPS** - Обязателен для production

## 📝 Примеры использования

### Вход студента в систему

```typescript
import { authApi } from "@/shared/api";

const user = await authApi.login("+1234567890", "password123");
// { id: '1', role: 'student', profileId: 's1', token: 'eyJ...' }
```

### Получение курсов студента

```typescript
import { courseApi, enrollmentApi } from "@/shared/api";

const enrollments = enrollmentApi.getStudentEnrollments("student1");
const courses = enrollments.map((e) => courseApi.getCourseById(e.courseId));
```

### Загрузка файла задания

```typescript
import { lessonApi } from "@/shared/api";

const result = await lessonApi.uploadTaskFile("task1", "student1", file);
// { success: true, message: 'Файл загружен' }
```

### Проверка квиза

```typescript
import { lessonApi } from "@/shared/api";

const results = await lessonApi.submitQuizAnswers("quiz1", "student1", answers);
// { correctCount: 2, total: 3, results: [...] }
```

## 🧪 Тестирование

Проект включает comprehensive тестовое покрытие:

- **32/32 tests passing** ✅
- Unit тесты для всех API методов
- Integration тесты для основных потоков
- Component тесты для UI компонентов

Запуск тестов:

```bash
npm run test
npm run test:coverage  # С отчетом покрытия
```

## 🔄 Миграция на реальный бэкэнд

Все API методы содержат встроенные комментарии с кодом для подключения реального сервера:

```typescript
// Backend integration: Fetch user profile from server
// const response = await fetch('/api/users/profile', {
//   headers: { 'Authorization': `Bearer ${token}` }
// });
```

Подробная инструкция находится в [API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md#инструкция-по-подключению-реального-бэкэнда).

## 📚 Документация

- [API Integration Guide](./API_INTEGRATION_GUIDE.md) - Полное руководство по API
- [API Endpoints Reference](./API_ENDPOINTS_REFERENCE.md) - Справка по endpoint'ам
- [Component Documentation](./docs/COMPONENTS.md) - Описание компонентов (если существует)

## 🤝 Вклад

Для добавления новой функциональности:

1. Создайте branch с описательным названием
2. Добавьте/обновите API методы в `src/shared/api/`
3. Добавьте тесты для новых методов
4. Обновите документацию
5. Создайте pull request

## 📄 Лицензия

MIT

## 👨‍💻 Разработка

**Последнее обновление**: 2026-05-05

**Версия**: 1.0.0 (Beta)

**Статус**: 🟢 Development (Ready for backend integration)

---

**Вопросы?** Смотрите документацию в [API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md)
