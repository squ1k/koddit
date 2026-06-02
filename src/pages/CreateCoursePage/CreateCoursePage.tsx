import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/app/layout/AppLayout";
import { setPageTitle, useUser } from "@/app/store/store";
import { courses } from "@/entities/course/model/courses";
import type { CourseSchedule } from "@/shared/types/courseModule";
import { RichTextEditor } from "@/shared/ui/RichTextEditor";
import "./CreateCoursePage.css";

interface ModuleData {
    id: string;
    title: string;
    annotation: string;
    lessons: LessonData[];
    tasks: TaskData[];
    quizzes: QuizData[];
}

interface LessonData {
    id: string;
    title: string;
    summary: string;
    content: string;
}

interface TaskData {
    id: string;
    title: string;
    description: string;
    content: string;
    hasFileUpload: boolean;
    hasTextAnswer: boolean;
    type: "standard" | "fill-blanks" | "drag-groups";
    fillBlanks?: FillBlanksData;
    dragGroups?: DragGroupsData;
}

interface FillBlanksData {
    text: string;
    blanks: { id: string; correctAnswer: string }[];
    wordBank: string[];
}

interface DragGroupsData {
    groups: { id: string; name: string; items: string[] }[];
    unsortedItems: string[];
}

interface QuizData {
    id: string;
    title: string;
    questions: QuizQuestionData[];
}

interface QuizQuestionData {
    id: string;
    text: string;
    options: { text: string; isCorrect: boolean }[];
}

const WEEKDAYS = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
];

export default function CreateCoursePage() {
    const user = useUser();
    const navigate = useNavigate();

    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [lessonsCount, setLessonsCount] = useState(16);
    const [startDate, setStartDate] = useState("");
    const [price, setPrice] = useState(3000);
    const [schedule, setSchedule] = useState<CourseSchedule[]>([
        { day: "Суббота", time: "12:00" },
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minStartDate = today.toISOString().split("T")[0];

    const [modules, setModules] = useState<ModuleData[]>([
        {
            id: "m1",
            title: "Модуль 1",
            annotation: "",
            lessons: [],
            tasks: [],
            quizzes: [],
        },
    ]);

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setPageTitle("Создание курса");
    }, []);

    useEffect(() => {
        if (!user || user.role !== "Учитель") {
            navigate("/profile", { replace: true });
        }
    }, [user, navigate]);

    if (!user || user.role !== "Учитель") {
        return null;
    }

    const addModule = () => {
        setModules([
            ...modules,
            {
                id: `m${modules.length + 1}`,
                title: `Модуль ${modules.length + 1}`,
                annotation: "",
                lessons: [],
                tasks: [],
                quizzes: [],
            },
        ]);
    };

    const removeModule = (index: number) => {
        if (modules.length > 1) {
            setModules(modules.filter((_, i) => i !== index));
        }
    };

    const updateModule = (
        index: number,
        field: "title" | "annotation",
        value: string,
    ) => {
        const updated = [...modules];
        updated[index] = {
            ...updated[index],
            [field]: value,
        };
        setModules(updated);
    };

    const addLesson = (moduleIndex: number) => {
        const updated = [...modules];
        updated[moduleIndex].lessons.push({
            id: `l${Date.now()}`,
            title: "",
            summary: "",
            content: "",
        });
        setModules(updated);
    };

    const updateLesson = (
        moduleIndex: number,
        lessonIndex: number,
        field: "title" | "summary" | "content",
        value: string,
    ) => {
        const updated = [...modules];
        const lesson = updated[moduleIndex].lessons[lessonIndex];
        updated[moduleIndex].lessons[lessonIndex] = {
            ...lesson,
            [field]: value,
        };
        setModules(updated);
    };

    const removeLesson = (moduleIndex: number, lessonIndex: number) => {
        const updated = [...modules];
        updated[moduleIndex].lessons = updated[moduleIndex].lessons.filter(
            (_, i) => i !== lessonIndex,
        );
        setModules(updated);
    };

    const addTask = (moduleIndex: number, type: "standard" | "fill-blanks" | "drag-groups" = "standard") => {
        const updated = [...modules];
        const newTask: TaskData = {
            id: `t${Date.now()}`,
            title: "",
            description: "",
            content: "",
            hasFileUpload: true,
            hasTextAnswer: true,
            type,
        };

        if (type === "fill-blanks") {
            newTask.fillBlanks = {
                text: "",
                blanks: [],
                wordBank: [],
            };
        } else if (type === "drag-groups") {
            newTask.dragGroups = {
                groups: [
                    { id: `g1`, name: "Группа 1", items: [] },
                    { id: `g2`, name: "Группа 2", items: [] },
                ],
                unsortedItems: [],
            };
        }

        updated[moduleIndex].tasks.push(newTask);
        setModules(updated);
    };

    const updateTask = (
        moduleIndex: number,
        taskIndex: number,
        field:
            | "title"
            | "description"
            | "content"
            | "hasFileUpload"
            | "hasTextAnswer"
            | "type",
        value: string | boolean,
    ) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        updated[moduleIndex].tasks[taskIndex] = {
            ...task,
            [field]: value,
        };
        setModules(updated);
    };

    const updateFillBlanks = (
        moduleIndex: number,
        taskIndex: number,
        field: "text",
        value: string,
    ) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.fillBlanks) {
            task.fillBlanks[field] = value;
        }
        setModules(updated);
    };

    const addBlank = (moduleIndex: number, taskIndex: number) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.fillBlanks) {
            task.fillBlanks.blanks.push({
                id: `b${Date.now()}`,
                correctAnswer: "",
            });
        }
        setModules(updated);
    };

    const updateBlank = (
        moduleIndex: number,
        taskIndex: number,
        blankIndex: number,
        value: string,
    ) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.fillBlanks) {
            task.fillBlanks.blanks[blankIndex].correctAnswer = value;
        }
        setModules(updated);
    };

    const removeBlank = (
        moduleIndex: number,
        taskIndex: number,
        blankIndex: number,
    ) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.fillBlanks) {
            task.fillBlanks.blanks = task.fillBlanks.blanks.filter(
                (_, i) => i !== blankIndex,
            );
        }
        setModules(updated);
    };

    const addWordBankItem = (moduleIndex: number, taskIndex: number) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.fillBlanks) {
            task.fillBlanks.wordBank.push("");
        }
        setModules(updated);
    };

    const updateWordBankItem = (
        moduleIndex: number,
        taskIndex: number,
        itemIndex: number,
        value: string,
    ) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.fillBlanks) {
            task.fillBlanks.wordBank[itemIndex] = value;
        }
        setModules(updated);
    };

    const removeWordBankItem = (
        moduleIndex: number,
        taskIndex: number,
        itemIndex: number,
    ) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.fillBlanks) {
            task.fillBlanks.wordBank = task.fillBlanks.wordBank.filter(
                (_, i) => i !== itemIndex,
            );
        }
        setModules(updated);
    };

    const addDragGroup = (moduleIndex: number, taskIndex: number) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.dragGroups) {
            task.dragGroups.groups.push({
                id: `g${Date.now()}`,
                name: `Группа ${task.dragGroups.groups.length + 1}`,
                items: [],
            });
        }
        setModules(updated);
    };

    const updateDragGroupName = (
        moduleIndex: number,
        taskIndex: number,
        groupIndex: number,
        value: string,
    ) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.dragGroups) {
            task.dragGroups.groups[groupIndex].name = value;
        }
        setModules(updated);
    };

    const removeDragGroup = (
        moduleIndex: number,
        taskIndex: number,
        groupIndex: number,
    ) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.dragGroups && task.dragGroups.groups.length > 1) {
            task.dragGroups.groups = task.dragGroups.groups.filter(
                (_, i) => i !== groupIndex,
            );
        }
        setModules(updated);
    };

    const addDragGroupItem = (
        moduleIndex: number,
        taskIndex: number,
        groupIndex: number,
    ) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.dragGroups) {
            task.dragGroups.groups[groupIndex].items.push("");
        }
        setModules(updated);
    };

    const updateDragGroupItem = (
        moduleIndex: number,
        taskIndex: number,
        groupIndex: number,
        itemIndex: number,
        value: string,
    ) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.dragGroups) {
            task.dragGroups.groups[groupIndex].items[itemIndex] = value;
        }
        setModules(updated);
    };

    const removeDragGroupItem = (
        moduleIndex: number,
        taskIndex: number,
        groupIndex: number,
        itemIndex: number,
    ) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.dragGroups) {
            task.dragGroups.groups[groupIndex].items = task.dragGroups.groups[
                groupIndex
            ].items.filter((_, i) => i !== itemIndex);
        }
        setModules(updated);
    };

    const addUnsortedItem = (moduleIndex: number, taskIndex: number) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.dragGroups) {
            task.dragGroups.unsortedItems.push("");
        }
        setModules(updated);
    };

    const updateUnsortedItem = (
        moduleIndex: number,
        taskIndex: number,
        itemIndex: number,
        value: string,
    ) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.dragGroups) {
            task.dragGroups.unsortedItems[itemIndex] = value;
        }
        setModules(updated);
    };

    const removeUnsortedItem = (
        moduleIndex: number,
        taskIndex: number,
        itemIndex: number,
    ) => {
        const updated = [...modules];
        const task = updated[moduleIndex].tasks[taskIndex];
        if (task.dragGroups) {
            task.dragGroups.unsortedItems = task.dragGroups.unsortedItems.filter(
                (_, i) => i !== itemIndex,
            );
        }
        setModules(updated);
    };

    const removeTask = (moduleIndex: number, taskIndex: number) => {
        const updated = [...modules];
        updated[moduleIndex].tasks = updated[moduleIndex].tasks.filter(
            (_, i) => i !== taskIndex,
        );
        setModules(updated);
    };

    const addQuiz = (moduleIndex: number) => {
        const updated = [...modules];
        updated[moduleIndex].quizzes.push({
            id: `q${Date.now()}`,
            title: "",
            questions: [
                {
                    id: `q1`,
                    text: "",
                    options: [{ text: "", isCorrect: false }],
                },
            ],
        });
        setModules(updated);
    };

    const updateQuiz = (
        moduleIndex: number,
        quizIndex: number,
        value: Partial<QuizData>,
    ) => {
        const updated = [...modules];
        updated[moduleIndex].quizzes[quizIndex] = {
            ...updated[moduleIndex].quizzes[quizIndex],
            ...value,
        };
        setModules(updated);
    };

    const addQuizQuestion = (moduleIndex: number, quizIndex: number) => {
        const updated = [...modules];
        const quiz = updated[moduleIndex].quizzes[quizIndex];
        quiz.questions.push({
            id: `q${Date.now()}`,
            text: "",
            options: [{ text: "", isCorrect: false }],
        });
        setModules(updated);
    };

    const updateQuizQuestion = (
        moduleIndex: number,
        quizIndex: number,
        qIndex: number,
        field: "text",
        value: string,
    ) => {
        const updated = [...modules];
        const question =
            updated[moduleIndex].quizzes[quizIndex].questions[qIndex];
        updated[moduleIndex].quizzes[quizIndex].questions[qIndex] = {
            ...question,
            [field]: value,
        };
        setModules(updated);
    };

    const updateQuizOption = (
        moduleIndex: number,
        quizIndex: number,
        qIndex: number,
        oIndex: number,
        field: "text" | "isCorrect",
        value: string | boolean,
    ) => {
        const updated = [...modules];
        const option =
            updated[moduleIndex].quizzes[quizIndex].questions[qIndex].options[
                oIndex
            ];

        updated[moduleIndex].quizzes[quizIndex].questions[qIndex].options[
            oIndex
        ] = {
            ...option,
            [field]: value,
        };
        setModules(updated);
    };

    const addQuizOption = (
        moduleIndex: number,
        quizIndex: number,
        qIndex: number,
    ) => {
        const updated = [...modules];
        updated[moduleIndex].quizzes[quizIndex].questions[qIndex].options.push({
            text: "",
            isCorrect: false,
        });
        setModules(updated);
    };

    const removeQuiz = (moduleIndex: number, quizIndex: number) => {
        const updated = [...modules];
        updated[moduleIndex].quizzes = updated[moduleIndex].quizzes.filter(
            (_, i) => i !== quizIndex,
        );
        setModules(updated);
    };

    const addScheduleSlot = () => {
        setSchedule([...schedule, { day: "Понедельник", time: "12:00" }]);
    };

    const updateSchedule = (
        index: number,
        field: "day" | "time",
        value: string,
    ) => {
        const updated = [...schedule];
        const slot = updated[index];
        updated[index] = {
            ...slot,
            [field]: value,
        };
        setSchedule(updated);
    };

    const removeSchedule = (index: number) => {
        if (schedule.length > 1) {
            setSchedule(schedule.filter((_, i) => i !== index));
        }
    };

    const isStartDateValid =
        startDate.trim().length > 0 && startDate >= minStartDate;

    const isStep1Valid =
        courseTitle.trim().length > 0 &&
        isStartDateValid &&
        lessonsCount > 0 &&
        price >= 0;

    const isStep2Valid = modules.every(
        (module) =>
            module.title.trim().length > 0 &&
            module.annotation.trim().length > 0,
    );

    const handleSubmit = () => {
        if (!courseTitle || !startDate) {
            alert("Пожалуйста, заполните название курса и дату начала");
            return;
        }

        if (startDate < minStartDate) {
            alert("Дата начала не может быть в прошлом");
            return;
        }

        const newCourse = {
            id: `c${Date.now()}`,
            title: courseTitle,
            teacherId: user.profileId,
            lessonsCount,
            startDate,
            price,
            schedule,
            description: courseDescription,
        };

        courses.push(newCourse);

        setIsSubmitting(true);

        setTimeout(() => {
            alert("Курс успешно создан!");
            setIsSubmitting(false);
            navigate("/profile");
        }, 1000);
    };

    return (
        <AppLayout>
            <div className="create-course-page">
                <h2>Создание курса</h2>

                <div className="steps-indicator">
                    <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
                        1. Основная информация
                    </div>
                    <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
                        2. Модули и материалы
                    </div>
                    <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
                        3. Расписание
                    </div>
                </div>

                {currentStep === 1 && (
                    <div className="step-content">
                        <div className="form-section">
                            <h3>Основная информация о курсе</h3>

                            <div className="form-group">
                                <label>Название курса</label>
                                <input
                                    type="text"
                                    value={courseTitle}
                                    onChange={(e) =>
                                        setCourseTitle(e.target.value)
                                    }
                                    placeholder="Введите название курса"
                                />
                            </div>

                            <div className="form-group">
                                <label>Описание курса</label>
                                <textarea
                                    value={courseDescription}
                                    onChange={(e) =>
                                        setCourseDescription(e.target.value)
                                    }
                                    placeholder="Введите описание курса"
                                    rows={4}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Количество занятий</label>
                                    <input
                                        type="number"
                                        value={lessonsCount}
                                        onChange={(e) =>
                                            setLessonsCount(
                                                parseInt(e.target.value) || 0,
                                            )
                                        }
                                        min={1}
                                        max={100}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Цена за месяц (₽)</label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(
                                                parseInt(e.target.value) || 0,
                                            )
                                        }
                                        min={0}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Дата начала *</label>
                                <input
                                    type="date"
                                    min={minStartDate}
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="step-actions">
                            <button
                                className="btn-primary"
                                onClick={() => setCurrentStep(2)}
                                disabled={!isStep1Valid}
                            >
                                Далее
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="step-content">
                        <h3>Модули и материалы курса</h3>

                        <div className="modules-builder">
                            {modules.map((module, moduleIndex) => (
                                <div key={module.id} className="module-builder">
                                    <div className="module-header">
                                        <h4>Модуль {moduleIndex + 1}</h4>
                                        {modules.length > 1 && (
                                            <button
                                                className="btn-remove"
                                                onClick={() =>
                                                    removeModule(moduleIndex)
                                                }
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>

                                    <div className="module-fields">
                                        <input
                                            type="text"
                                            value={module.title}
                                            onChange={(e) =>
                                                updateModule(
                                                    moduleIndex,
                                                    "title",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Название модуля"
                                        />
                                        <textarea
                                            value={module.annotation}
                                            onChange={(e) =>
                                                updateModule(
                                                    moduleIndex,
                                                    "annotation",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Аннотация модуля"
                                            rows={2}
                                        />
                                    </div>

                                    <div className="module-content">
                                        <div className="content-section">
                                            <div className="content-header">
                                                <h5>
                                                    Уроки (теоретические
                                                    материалы)
                                                </h5>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        addLesson(moduleIndex)
                                                    }
                                                >
                                                    + Добавить урок
                                                </button>
                                            </div>
                                            {module.lessons.map(
                                                (lesson, lessonIndex) => (
                                                    <div
                                                        key={lesson.id}
                                                        className="content-item"
                                                    >
                                                        <input
                                                            type="text"
                                                            value={lesson.title}
                                                            onChange={(e) =>
                                                                updateLesson(
                                                                    moduleIndex,
                                                                    lessonIndex,
                                                                    "title",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Название урока"
                                                        />
                                                        <textarea
                                                            value={
                                                                lesson.summary
                                                            }
                                                            onChange={(e) =>
                                                                updateLesson(
                                                                    moduleIndex,
                                                                    lessonIndex,
                                                                    "summary",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Краткое описание"
                                                        />
                                                        <RichTextEditor
                                                            value={
                                                                lesson.content
                                                            }
                                                            onChange={(value) =>
                                                                updateLesson(
                                                                    moduleIndex,
                                                                    lessonIndex,
                                                                    "content",
                                                                    value,
                                                                )
                                                            }
                                                            placeholder="Содержание урока"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn-remove-small"
                                                            onClick={() =>
                                                                removeLesson(
                                                                    moduleIndex,
                                                                    lessonIndex,
                                                                )
                                                            }
                                                        >
                                                            Удалить
                                                        </button>
                                                    </div>
                                                ),
                                            )}
                                        </div>

                                        <div className="content-section">
                                            <div className="content-header">
                                                <h5>Задания</h5>
                                                <div className="add-task-buttons">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            addTask(moduleIndex, "standard")
                                                        }
                                                    >
                                                        + Стандартное
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            addTask(moduleIndex, "fill-blanks")
                                                        }
                                                    >
                                                        + Заполнение пропусков
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            addTask(moduleIndex, "drag-groups")
                                                        }
                                                    >
                                                        + Распределение по группам
                                                    </button>
                                                </div>
                                            </div>
                                            {module.tasks.map(
                                                (task, taskIndex) => (
                                                    <div
                                                        key={task.id}
                                                        className="content-item"
                                                    >
                                                        <div className="task-type-selector">
                                                            <label>Тип задания:</label>
                                                            <select
                                                                value={task.type}
                                                                onChange={(e) =>
                                                                    updateTask(
                                                                        moduleIndex,
                                                                        taskIndex,
                                                                        "type",
                                                                        e.target.value as "standard" | "fill-blanks" | "drag-groups",
                                                                    )
                                                                }
                                                            >
                                                                <option value="standard">Стандартное</option>
                                                                <option value="fill-blanks">Заполнение пропусков</option>
                                                                <option value="drag-groups">Распределение по группам</option>
                                                            </select>
                                                        </div>

                                                        <input
                                                            type="text"
                                                            value={task.title}
                                                            onChange={(e) =>
                                                                updateTask(
                                                                    moduleIndex,
                                                                    taskIndex,
                                                                    "title",
                                                                    e.target.value,
                                                                )
                                                            }
                                                            placeholder="Название задания"
                                                        />
                                                        <textarea
                                                            value={task.description}
                                                            onChange={(e) =>
                                                                updateTask(
                                                                    moduleIndex,
                                                                    taskIndex,
                                                                    "description",
                                                                    e.target.value,
                                                                )
                                                            }
                                                            placeholder="Описание задания"
                                                        />

                                                        {task.type === "standard" && (
                                                            <>
                                                                <RichTextEditor
                                                                    value={task.content}
                                                                    onChange={(value) =>
                                                                        updateTask(
                                                                            moduleIndex,
                                                                            taskIndex,
                                                                            "content",
                                                                            value,
                                                                        )
                                                                    }
                                                                    placeholder="Материалы задания"
                                                                />
                                                                <div className="checkbox-group">
                                                                    <label>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={task.hasFileUpload}
                                                                            onChange={(e) =>
                                                                                updateTask(
                                                                                    moduleIndex,
                                                                                    taskIndex,
                                                                                    "hasFileUpload",
                                                                                    e.target.checked,
                                                                                )
                                                                            }
                                                                        />
                                                                        Разрешить загрузку файлов
                                                                    </label>
                                                                    <label>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={task.hasTextAnswer}
                                                                            onChange={(e) =>
                                                                                updateTask(
                                                                                    moduleIndex,
                                                                                    taskIndex,
                                                                                    "hasTextAnswer",
                                                                                    e.target.checked,
                                                                                )
                                                                            }
                                                                        />
                                                                        Разрешить текстовый ответ
                                                                    </label>
                                                                </div>
                                                            </>
                                                        )}

                                                        {task.type === "fill-blanks" && (
                                                            <div className="fill-blanks-editor">
                                                                <h6>Текст с пропусками</h6>
                                                                <p className="hint-text">
                                                                    Используйте {'{blank}'} для обозначения пропуска в тексте
                                                                </p>
                                                                <textarea
                                                                    value={task.fillBlanks?.text || ""}
                                                                    onChange={(e) =>
                                                                        updateFillBlanks(
                                                                            moduleIndex,
                                                                            taskIndex,
                                                                            "text",
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    placeholder="Введите текст задания. Используйте {blank} для пропусков"
                                                                    rows={4}
                                                                />

                                                                <div className="blanks-section">
                                                                    <div className="section-header">
                                                                        <h6>Правильные ответы для пропусков</h6>
                                                                        <button
                                                                            type="button"
                                                                            className="btn-add-small"
                                                                            onClick={() =>
                                                                                addBlank(moduleIndex, taskIndex)
                                                                            }
                                                                        >
                                                                            + Пропуск
                                                                        </button>
                                                                    </div>
                                                                    {task.fillBlanks?.blanks.map((blank, blankIndex) => (
                                                                        <div key={blank.id} className="blank-item">
                                                                            <span>Пропуск {blankIndex + 1}:</span>
                                                                            <input
                                                                                type="text"
                                                                                value={blank.correctAnswer}
                                                                                onChange={(e) =>
                                                                                    updateBlank(
                                                                                        moduleIndex,
                                                                                        taskIndex,
                                                                                        blankIndex,
                                                                                        e.target.value,
                                                                                    )
                                                                                }
                                                                                placeholder="Правильный ответ"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                className="btn-remove-small"
                                                                                onClick={() =>
                                                                                    removeBlank(
                                                                                        moduleIndex,
                                                                                        taskIndex,
                                                                                        blankIndex,
                                                                                    )
                                                                                }
                                                                            >
                                                                                ×
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                                <div className="word-bank-section">
                                                                    <div className="section-header">
                                                                        <h6>Банк слов</h6>
                                                                        <button
                                                                            type="button"
                                                                            className="btn-add-small"
                                                                            onClick={() =>
                                                                                addWordBankItem(moduleIndex, taskIndex)
                                                                            }
                                                                        >
                                                                            + Слово
                                                                        </button>
                                                                    </div>
                                                                    {task.fillBlanks?.wordBank.map((word, wordIndex) => (
                                                                        <div key={wordIndex} className="word-bank-item">
                                                                            <input
                                                                                type="text"
                                                                                value={word}
                                                                                onChange={(e) =>
                                                                                    updateWordBankItem(
                                                                                        moduleIndex,
                                                                                        taskIndex,
                                                                                        wordIndex,
                                                                                        e.target.value,
                                                                                    )
                                                                                }
                                                                                placeholder="Слово для перетаскивания"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                className="btn-remove-small"
                                                                                onClick={() =>
                                                                                    removeWordBankItem(
                                                                                        moduleIndex,
                                                                                        taskIndex,
                                                                                        wordIndex,
                                                                                    )
                                                                                }
                                                                            >
                                                                                ×
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {task.type === "drag-groups" && (
                                                            <div className="drag-groups-editor">
                                                                <h6>Группы для распределения</h6>
                                                                {task.dragGroups?.groups.map((group, groupIndex) => (
                                                                    <div key={group.id} className="drag-group">
                                                                        <div className="group-header">
                                                                            <input
                                                                                type="text"
                                                                                value={group.name}
                                                                                onChange={(e) =>
                                                                                    updateDragGroupName(
                                                                                        moduleIndex,
                                                                                        taskIndex,
                                                                                        groupIndex,
                                                                                        e.target.value,
                                                                                    )
                                                                                }
                                                                                placeholder="Название группы"
                                                                            />
                                                                            {task.dragGroups && task.dragGroups.groups.length > 1 && (
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn-remove-small"
                                                                                    onClick={() =>
                                                                                        removeDragGroup(
                                                                                            moduleIndex,
                                                                                            taskIndex,
                                                                                            groupIndex,
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    ×
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                        <div className="group-items">
                                                                            {group.items.map((item, itemIndex) => (
                                                                                <div key={itemIndex} className="group-item">
                                                                                    <input
                                                                                        type="text"
                                                                                        value={item}
                                                                                        onChange={(e) =>
                                                                                            updateDragGroupItem(
                                                                                                moduleIndex,
                                                                                                taskIndex,
                                                                                                groupIndex,
                                                                                                itemIndex,
                                                                                                e.target.value,
                                                                                            )
                                                                                        }
                                                                                        placeholder="Объект"
                                                                                    />
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn-remove-small"
                                                                                        onClick={() =>
                                                                                            removeDragGroupItem(
                                                                                                moduleIndex,
                                                                                                taskIndex,
                                                                                                groupIndex,
                                                                                                itemIndex,
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        ×
                                                                                    </button>
                                                                                </div>
                                                                            ))}
                                                                            <button
                                                                                type="button"
                                                                                className="btn-add-small"
                                                                                onClick={() =>
                                                                                    addDragGroupItem(
                                                                                        moduleIndex,
                                                                                        taskIndex,
                                                                                        groupIndex,
                                                                                    )
                                                                                }
                                                                            >
                                                                                + Объект
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                <button
                                                                    type="button"
                                                                    className="btn-add-small"
                                                                    onClick={() =>
                                                                        addDragGroup(moduleIndex, taskIndex)
                                                                    }
                                                                >
                                                                    + Группа
                                                                </button>

                                                                <div className="unsorted-section">
                                                                    <h6>Несортированные объекты</h6>
                                                                    {task.dragGroups?.unsortedItems.map((item, itemIndex) => (
                                                                        <div key={itemIndex} className="unsorted-item">
                                                                            <input
                                                                                type="text"
                                                                                value={item}
                                                                                onChange={(e) =>
                                                                                    updateUnsortedItem(
                                                                                        moduleIndex,
                                                                                        taskIndex,
                                                                                        itemIndex,
                                                                                        e.target.value,
                                                                                    )
                                                                                }
                                                                                placeholder="Объект для распределения"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                className="btn-remove-small"
                                                                                onClick={() =>
                                                                                    removeUnsortedItem(
                                                                                        moduleIndex,
                                                                                        taskIndex,
                                                                                        itemIndex,
                                                                                    )
                                                                                }
                                                                            >
                                                                                ×
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                    <button
                                                                        type="button"
                                                                        className="btn-add-small"
                                                                        onClick={() =>
                                                                            addUnsortedItem(moduleIndex, taskIndex)
                                                                        }
                                                                    >
                                                                        + Объект
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}

                                                        <button
                                                            type="button"
                                                            className="btn-remove-small"
                                                            onClick={() =>
                                                                removeTask(
                                                                    moduleIndex,
                                                                    taskIndex,
                                                                )
                                                            }
                                                        >
                                                            Удалить
                                                        </button>
                                                    </div>
                                                ),
                                            )}
                                        </div>

                                        <div className="content-section">
                                            <div className="content-header">
                                                <h5>Тесты</h5>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        addQuiz(moduleIndex)
                                                    }
                                                >
                                                    + Добавить тест
                                                </button>
                                            </div>
                                            {module.quizzes.map(
                                                (quiz, quizIndex) => (
                                                    <div
                                                        key={quiz.id}
                                                        className="content-item quiz-item"
                                                    >
                                                        <input
                                                            type="text"
                                                            value={quiz.title}
                                                            onChange={(e) =>
                                                                updateQuiz(
                                                                    moduleIndex,
                                                                    quizIndex,
                                                                    {
                                                                        title: e
                                                                            .target
                                                                            .value,
                                                                    },
                                                                )
                                                            }
                                                            placeholder="Название теста"
                                                        />
                                                        <div className="questions-list">
                                                            {quiz.questions.map(
                                                                (
                                                                    question,
                                                                    qIndex,
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            question.id
                                                                        }
                                                                        className="question-item"
                                                                    >
                                                                        <input
                                                                            type="text"
                                                                            value={
                                                                                question.text
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                updateQuizQuestion(
                                                                                    moduleIndex,
                                                                                    quizIndex,
                                                                                    qIndex,
                                                                                    "text",
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }
                                                                            placeholder="Текст вопроса"
                                                                        />
                                                                        <div className="options-list">
                                                                            {question.options.map(
                                                                                (
                                                                                    option,
                                                                                    oIndex,
                                                                                ) => (
                                                                                    <div
                                                                                        key={
                                                                                            oIndex
                                                                                        }
                                                                                        className="option-item"
                                                                                    >
                                                                                        <input
                                                                                            type="text"
                                                                                            value={
                                                                                                option.text
                                                                                            }
                                                                                            onChange={(
                                                                                                e,
                                                                                            ) =>
                                                                                                updateQuizOption(
                                                                                                    moduleIndex,
                                                                                                    quizIndex,
                                                                                                    qIndex,
                                                                                                    oIndex,
                                                                                                    "text",
                                                                                                    e
                                                                                                        .target
                                                                                                        .value,
                                                                                                )
                                                                                            }
                                                                                            placeholder="Вариант ответа"
                                                                                        />
                                                                                        <label>
                                                                                            <input
                                                                                                type="radio"
                                                                                                name={`correct-${question.id}`}
                                                                                                checked={
                                                                                                    option.isCorrect
                                                                                                }
                                                                                                onChange={() => {
                                                                                                    question.options.forEach(
                                                                                                        (
                                                                                                            _,
                                                                                                            i,
                                                                                                        ) =>
                                                                                                            updateQuizOption(
                                                                                                                moduleIndex,
                                                                                                                quizIndex,
                                                                                                                qIndex,
                                                                                                                i,
                                                                                                                "isCorrect",
                                                                                                                i ===
                                                                                                                    oIndex,
                                                                                                            ),
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                            Правильный
                                                                                        </label>
                                                                                    </div>
                                                                                ),
                                                                            )}
                                                                            <button
                                                                                type="button"
                                                                                className="btn-add-small"
                                                                                onClick={() =>
                                                                                    addQuizOption(
                                                                                        moduleIndex,
                                                                                        quizIndex,
                                                                                        qIndex,
                                                                                    )
                                                                                }
                                                                            >
                                                                                +
                                                                                вариант
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ),
                                                            )}
                                                            <button
                                                                type="button"
                                                                className="btn-add-small"
                                                                onClick={() =>
                                                                    addQuizQuestion(
                                                                        moduleIndex,
                                                                        quizIndex,
                                                                    )
                                                                }
                                                            >
                                                                + вопрос
                                                            </button>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="btn-remove-small"
                                                            onClick={() =>
                                                                removeQuiz(
                                                                    moduleIndex,
                                                                    quizIndex,
                                                                )
                                                            }
                                                        >
                                                            Удалить тест
                                                        </button>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                className="btn-add-module"
                                onClick={addModule}
                            >
                                + Добавить модуль
                            </button>
                        </div>

                        <div className="step-actions">
                            <button
                                className="btn-secondary"
                                onClick={() => setCurrentStep(1)}
                            >
                                Назад
                            </button>
                            <button
                                className="btn-primary"
                                onClick={() => setCurrentStep(3)}
                                disabled={!isStep2Valid}
                            >
                                Далее
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="step-content">
                        <h3>Расписание курса</h3>

                        <div className="schedule-builder">
                            <p className="info-text">
                                Добавьте дни и время занятий курса
                            </p>

                            {schedule.map((slot, index) => (
                                <div key={index} className="schedule-slot">
                                    <select
                                        value={slot.day}
                                        onChange={(e) =>
                                            updateSchedule(
                                                index,
                                                "day",
                                                e.target.value,
                                            )
                                        }
                                    >
                                        {WEEKDAYS.map((day) => (
                                            <option key={day} value={day}>
                                                {day}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="time"
                                        value={slot.time}
                                        onChange={(e) =>
                                            updateSchedule(
                                                index,
                                                "time",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {schedule.length > 1 && (
                                        <button
                                            type="button"
                                            className="btn-remove"
                                            onClick={() =>
                                                removeSchedule(index)
                                            }
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button
                                type="button"
                                className="btn-add-schedule"
                                onClick={addScheduleSlot}
                            >
                                + Добавить время занятия
                            </button>
                        </div>

                        <div className="course-summary">
                            <h4>Итого:</h4>
                            <p>Курс: {courseTitle || "Без названия"}</p>
                            <p>Модулей: {modules.length}</p>
                            <p>
                                Уроков:{" "}
                                {modules.reduce(
                                    (acc, m) => acc + m.lessons.length,
                                    0,
                                )}
                            </p>
                            <p>
                                Заданий:{" "}
                                {modules.reduce(
                                    (acc, m) => acc + m.tasks.length,
                                    0,
                                )}
                            </p>
                            <p>
                                Тестов:{" "}
                                {modules.reduce(
                                    (acc, m) => acc + m.quizzes.length,
                                    0,
                                )}
                            </p>
                            <p>
                                Расписание:{" "}
                                {schedule
                                    .map((s) => `${s.day} ${s.time}`)
                                    .join(", ")}
                            </p>
                        </div>

                        <div className="step-actions">
                            <button
                                className="btn-secondary"
                                onClick={() => setCurrentStep(2)}
                            >
                                Назад
                            </button>
                            <button
                                className="btn-primary"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Создание..." : "Создать курс"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
