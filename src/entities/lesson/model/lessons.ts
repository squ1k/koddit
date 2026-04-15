import type { Lesson, Task, Quiz } from "@/shared/types/courseModule";

export const lessons: Lesson[] = [
  {
    id: "l1",
    moduleId: "m1",
    title: "Интерфейс Unity",
    order: 1,
    summary: "Знакомство с редактором Unity, основными окнами и панелями инструментов.",
    content: `
      <h2>Введение в Unity</h2>
      <p>Unity — это мощный игровой движок для создания 2D и 3D игр. В этом уроке мы изучим основные элементы интерфейса.</p>
      
      <h3>Основные окна редактора:</h3>
      <ul>
        <li><strong>Scene View</strong> — окно для визуального редактирования игровых объектов</li>
        <li><strong>Game View</strong> — окно предпросмотра игры</li>
        <li><strong>Hierarchy</strong> — список всех объектов на текущей сцене</li>
        <li><strong>Project</strong> — файловый браузер проекта</li>
        <li><strong>Inspector</strong> — панель свойств выбранного объекта</li>
      </ul>
      
      <h3>Панель инструментов:</h3>
      <p>В верхней части окна расположена панель инструментов для перемещения (Move), вращения (Rotate) и масштабирования (Scale) объектов.</p>
    `,
    isCompleted: true
  },
  {
    id: "l2",
    moduleId: "m1",
    title: "Создание первой сцены",
    order: 2,
    summary: "Создание простой игровой сцены, добавление объектов и настройка освещения.",
    content: `
      <h2>Создание сцены</h2>
      <p>Сцена — это единица игрового мира. Давайте создадим нашу первую сцену.</p>
      
      <h3>Шаги:</h3>
      <ol>
        <li>Создайте новый проект или откройте существующий</li>
        <li>В меню File выберите New Scene</li>
        <li>Добавьте 3D-объект через правую кнопку мыши в Hierarchy → 3D Object → Cube</li>
        <li>Настройте освещение через Window → Rendering → Lighting</li>
        <li>Добавьте камеру и настройте её позицию</li>
      </ol>
    `,
    isCompleted: true
  },
  {
    id: "l3",
    moduleId: "m1",
    title: "Работа с объектами",
    order: 3,
    summary: "Перемещение, вращение и масштабирование объектов в Unity.",
    content: `
      <h2>Трансформации объектов</h2>
      <p>Каждый объект в Unity имеет компонент Transform, который определяет его положение, поворот и размер.</p>
      
      <h3>Инструменты трансформации:</h3>
      <ul>
        <li><strong>Q</strong> — перемещение (Move)</li>
        <li><strong>W</strong> — вращение (Rotate)</li>
        <li><strong>E</strong> — масштабирование (Scale)</li>
      </ul>
    `,
    isCompleted: false
  },
  {
    id: "l4",
    moduleId: "m2",
    title: "Физический движок",
    order: 1,
    summary: "Изучение физического движка Unity, добавление Rigidbody и коллайдеров.",
    content: `
      <h2>Физика в Unity</h2>
      <p>Unity использует физический движок NVIDIA PhysX для симуляции реалистичной физики.</p>
      
      <h3>Основные компоненты:</h3>
      <ul>
        <li><strong>Rigidbody</strong> — придаёт объекту физические свойства (массу, гравитацию)</li>
        <li><strong>Collider</strong> — определяет форму объекта для столкновений</li>
        <li><strong>Joint</strong> — соединяет объекты</li>
      </ul>
    `,
    isCompleted: false
  },
  {
    id: "l5",
    moduleId: "m2",
    title: "Гравитация и столкновения",
    order: 2,
    summary: "Настройка гравитации, обработка столкновений между объектами.",
    content: `
      <h2>Гравитация и столкновения</h2>
      <p>В этом уроке мы изучим, как настроить гравитацию и обрабатывать столкновения между объектами.</p>
    `,
    isCompleted: false
  },
  {
    id: "l6",
    moduleId: "m3",
    title: "Введение в C#",
    order: 1,
    summary: "Основы языка программирования C# для Unity.",
    content: `
      <h2>Введение в C#</h2>
      <p>C# — основной язык программирования в Unity. Давайте изучим базовый синтаксис.</p>
      
      <h3>Переменные и типы данных:</h3>
      <pre><code>int score = 100;
float speed = 5.5f;
string playerName = "Player";
bool isAlive = true;</code></pre>
      
      <h3>Операторы:</h3>
      <ul>
        <li><strong>Арифметические:</strong> + - * / %</li>
        <li><strong>Сравнения:</strong> == != < > <= >=</li>
        <li><strong>Логические:</strong> && || !</li>
      </ul>
    `,
    isCompleted: false
  },
  {
    id: "l7",
    moduleId: "m3",
    title: "Методы и классы",
    order: 2,
    summary: "Создание методов и классов в Unity.",
    content: `
      <h2>Методы и классы</h2>
      <p>Классы — основа объектно-ориентированного программирования в C#.</p>
      
      <h3>Создание класса:</h3>
      <pre><code>public class Player : MonoBehaviour {
    public string name;
    public int health = 100;
    
    void Start() {
        Debug.Log("Player created: " + name);
    }
    
    public void TakeDamage(int damage) {
        health -= damage;
    }
}</code></pre>
    `,
    isCompleted: false
  },
  {
    id: "l8",
    moduleId: "m4",
    title: "Анимация в Unity",
    order: 1,
    summary: "Создание и настройка анимаций.",
    content: `
      <h2>Анимация в Unity</h2>
      <p>Unity использует систему Animation для создания анимаций персонажей и объектов.</p>
      
      <h3>Компонент Animator:</h3>
      <p>Animator управляет переходами между анимациями через контроллер анимаций (Animator Controller).</p>
    `,
    isCompleted: false
  },
  {
    id: "l9",
    moduleId: "m4",
    title: "Система частиц",
    order: 2,
    summary: "Создание эффектов с помощью Particle System.",
    content: `
      <h2>Система частиц</h2>
      <p>Particle System позволяет создавать эффекты: огонь, дым, взрывы, магию.</p>
      
      <h3>Основные компоненты:</h3>
      <ul>
        <li><strong>Emission</strong> — скорость испускания частиц</li>
        <li><strong>Shape</strong> — форма испускания</li>
        <li><strong>Renderer</strong> — внешний вид частиц</li>
      </ul>
    `,
    isCompleted: false
  }
];

export const tasks: Task[] = [
  {
    id: "t1",
    lessonId: "l1",
    title: "Создать новый проект",
    description: "Создайте новый проект в Unity и настройте базовые параметры. Назовите проект MyFirstGame.",
    content: "<h2>Задание: Создание нового проекта</h2><p>Откройте Unity Hub и создайте новый проект. Выберите шаблон 3D Core и назовите проект MyFirstGame.</p><h3>Критерии:</h3><ul><li>Проект создан успешно</li><li>Открывается в Unity Editor</li><li>Есть базовая сцена</li></ul>",
    order: 1,
    isCompleted: true
  },
  {
    id: "t2",
    lessonId: "l1",
    title: "Изучить панели",
    description: "Познакомьтесь со всеми основными панелями Unity Editor и изучите их назначение.",
    content: "<h2>Задание: Изучение панелей</h2><p>Откройте каждую стандартную панель Unity и изучите её функции.</p>",
    order: 2,
    isCompleted: true
  },
  {
    id: "t3",
    lessonId: "l2",
    title: "Создать сцену",
    description: "Создайте новую сцену и добавьте в нее минимум 3 разных объекта.",
    content: "<h2>Задание: Создание сцены</h2><p>Создайте сцену с кубом, сферой и плоскостью. Расположите их в пространстве.</p>",
    order: 1,
    isCompleted: false
  },
  {
    id: "t4",
    lessonId: "l2",
    title: "Настроить освещение",
    description: "Добавьте источники света и настройте освещение сцены для создания атмосферы.",
    content: "<h2>Задание: Настройка освещения</h2><p>Добавьте Directional Light и Point Light. Настройте их интенсивность и цвет.</p>",
    order: 2,
    isCompleted: false
  },
  {
    id: "t5",
    lessonId: "l4",
    title: "Добавить физику",
    description: "Добавьте Rigidbody к объекту и настройте его параметры.",
    content: "<h2>Задание: Добавление физики</h2><p>Создайте куб, добавьте компонент Rigidbody и настройте массу, гравитацию и другие параметры.</p>",
    order: 1,
    isCompleted: false
  },
  {
    id: "t6",
    lessonId: "l5",
    title: "Обработка столкновений",
    description: "Создайте скрипт для обработки столкновений.",
    content: "<h2>Задание: Обработка столкновений</h2><p>Напишите скрипт, который выводит сообщение при столкновении объектов.</p>",
    order: 2,
    isCompleted: false
  },
  {
    id: "t7",
    lessonId: "l6",
    title: "Написать скрипт",
    description: "Создайте простой скрипт с переменными и методами.",
    content: "<h2>Задание: Создание скрипта</h2><p>Напишите скрипт Player с переменными health и name, методом TakeDamage().</p>",
    order: 1,
    isCompleted: false
  },
  {
    id: "t8",
    lessonId: "l7",
    title: "Создать класс",
    description: "Создайте класс с методами и свойствами.",
    content: "<h2>Задание: Создание класса</h2><p>Создайте класс Enemy с методами Move() и Attack().</p>",
    order: 2,
    isCompleted: false
  }
];

export const quizzes: Quiz[] = [
  {
    id: "q1",
    lessonId: "l1",
    title: "Тест по интерфейсу Unity",
    order: 1,
    questions: [
      {
        id: "q1-1",
        text: "Какая горячая клавиша для инструмента перемещения (Move)?",
        options: [
          { id: "q1-1-a", text: "Q", isCorrect: false },
          { id: "q1-1-b", text: "W", isCorrect: false },
          { id: "q1-1-c", text: "E", isCorrect: false },
          { id: "q1-1-d", text: "R", isCorrect: true }
        ]
      },
      {
        id: "q1-2",
        text: "Где находится панель Inspector?",
        options: [
          { id: "q1-2-a", text: "Слева вверху", isCorrect: false },
          { id: "q1-2-b", text: "Справа", isCorrect: true },
          { id: "q1-2-c", text: "Внизу", isCorrect: false },
          { id: "q1-2-d", text: "По центру", isCorrect: false }
        ]
      },
      {
        id: "q1-3",
        text: "Какое окно показывает игровой вид (результат)?",
        options: [
          { id: "q1-3-a", text: "Scene View", isCorrect: false },
          { id: "q1-3-b", text: "Game View", isCorrect: true },
          { id: "q1-3-c", text: "Project", isCorrect: false },
          { id: "q1-3-d", text: "Console", isCorrect: false }
        ]
      },
      {
        id: "q1-4",
        text: "Для чего используется Hierarchy?",
        options: [
          { id: "q1-4-a", text: "Просмотр файлов проекта", isCorrect: false },
          { id: "q1-4-b", text: "Список объектов на сцене", isCorrect: true },
          { id: "q1-4-c", text: "Настройка освещения", isCorrect: false },
          { id: "q1-4-d", text: "Редактирование скриптов", isCorrect: false }
        ]
      },
      {
        id: "q1-5",
        text: "Какой инструмент используется для вращения объекта?",
        options: [
          { id: "q1-5-a", text: "Q", isCorrect: false },
          { id: "q1-5-b", text: "W", isCorrect: false },
          { id: "q1-5-c", text: "E", isCorrect: true },
          { id: "q1-5-d", text: "R", isCorrect: false }
        ]
      },
      {
        id: "q1-6",
        text: "Где отображаются ошибки компиляции?",
        options: [
          { id: "q1-6-a", text: "Project", isCorrect: false },
          { id: "q1-6-b", text: "Console", isCorrect: true },
          { id: "q1-6-c", text: "Inspector", isCorrect: false },
          { id: "q1-6-d", text: "Game View", isCorrect: false }
        ]
      },
      {
        id: "q1-7",
        text: "Как создать новый объект на сцене?",
        options: [
          { id: "q1-7-a", text: "Ctrl+N", isCorrect: false },
          { id: "q1-7-b", text: "Правый клик в Hierarchy → 3D Object", isCorrect: true },
          { id: "q1-7-c", text: "Двойной клик в Project", isCorrect: false },
          { id: "q1-7-d", text: "F5", isCorrect: false }
        ]
      },
      {
        id: "q1-8",
        text: "Какая панель показывает свойства выбранного объекта?",
        options: [
          { id: "q1-8-a", text: "Scene", isCorrect: false },
          { id: "q1-8-b", text: "Inspector", isCorrect: true },
          { id: "q1-8-c", text: "Hierarchy", isCorrect: false },
          { id: "q1-8-d", text: "Toolbar", isCorrect: false }
        ]
      },
      {
        id: "q1-9",
        text: "Как сохранить сцену в Unity?",
        options: [
          { id: "q1-9-a", text: "Ctrl+S", isCorrect: true },
          { id: "q1-9-b", text: "Ctrl+Z", isCorrect: false },
          { id: "q1-9-c", text: "F6", isCorrect: false },
          { id: "q1-9-d", text: "Alt+S", isCorrect: false }
        ]
      },
      {
        id: "q1-10",
        text: "Какой инструмент масштабирования?",
        options: [
          { id: "q1-10-a", text: "Q", isCorrect: false },
          { id: "q1-10-b", text: "W", isCorrect: false },
          { id: "q1-10-c", text: "E", isCorrect: false },
          { id: "q1-10-d", text: "R", isCorrect: true }
        ]
      }
    ],
    content: "<h2>Тест: Интерфейс Unity</h2><p>Ответьте на 10 вопросов об интерфейсе редактора Unity.</p>",
    isCompleted: true
  },
  {
    id: "q2",
    lessonId: "l2",
    title: "Тест по созданию сцен",
    order: 2,
    questions: [
      {
        id: "q2-1",
        text: "Как создать новую сцену?",
        options: [
          { id: "q2-1-a", text: "File → New Scene", isCorrect: true },
          { id: "q2-1-b", text: "Edit → Duplicate", isCorrect: false },
          { id: "q2-1-c", text: "Window → New Window", isCorrect: false },
          { id: "q2-1-d", text: "Ctrl+N в Project", isCorrect: false }
        ]
      },
      {
        id: "q2-2",
        text: "Какой объект используется как пол/земля?",
        options: [
          { id: "q2-2-a", text: "Sphere", isCorrect: false },
          { id: "q2-2-b", text: "Cylinder", isCorrect: false },
          { id: "q2-2-c", text: "Plane", isCorrect: true },
          { id: "q2-2-d", text: "Cube", isCorrect: false }
        ]
      },
      {
        id: "q2-3",
        text: "Какой компонент отвечает за освещение сцены?",
        options: [
          { id: "q2-3-a", text: "Camera", isCorrect: false },
          { id: "q2-3-b", text: "Directional Light", isCorrect: true },
          { id: "q2-3-c", text: "Rigidbody", isCorrect: false },
          { id: "q2-3-d", text: "Mesh Renderer", isCorrect: false }
        ]
      },
      {
        id: "q2-4",
        text: "Где настраивается качество освещения?",
        options: [
          { id: "q2-4-a", text: "File → Settings", isCorrect: false },
          { id: "q2-4-b", text: "Window → Rendering → Lighting", isCorrect: true },
          { id: "q2-4-c", text: "Edit → Preferences", isCorrect: false },
          { id: "q2-4-d", text: "Game View настройки", isCorrect: false }
        ]
      },
      {
        id: "q2-5",
        text: "Как добавить камеру на сцену?",
        options: [
          { id: "q2-5-a", text: "GameObject → 2D Object → Camera", isCorrect: false },
          { id: "q2-5-b", text: "GameObject → Camera", isCorrect: false },
          { id: "q2-5-c", text: "GameObject → Camera (устарело)", isCorrect: false },
          { id: "q2-5-d", text: "При создании новой сцены камера добавляется автоматически", isCorrect: true }
        ]
      },
      {
        id: "q2-6",
        text: "Какой тип освещения имитирует солнце?",
        options: [
          { id: "q2-6-a", text: "Point Light", isCorrect: false },
          { id: "q2-6-b", text: "Spot Light", isCorrect: false },
          { id: "q2-6-c", text: "Directional Light", isCorrect: true },
          { id: "q2-6-d", text: "Area Light", isCorrect: false }
        ]
      },
      {
        id: "q2-7",
        text: "Как изменить цвет фона в Game View?",
        options: [
          { id: "q2-7-a", text: "В Inspector камеры → Background", isCorrect: true },
          { id: "q2-7-b", text: "В Scene View → Background", isCorrect: false },
          { id: "q2-7-c", text: "Edit → Preferences → Colors", isCorrect: false },
          { id: "q2-7-d", text: "Window → Game → Background", isCorrect: false }
        ]
      },
      {
        id: "q2-8",
        text: "Сколько объектов минимум нужно добавить в сцену по заданию?",
        options: [
          { id: "q2-8-a", text: "1", isCorrect: false },
          { id: "q2-8-b", text: "2", isCorrect: false },
          { id: "q2-8-c", text: "3", isCorrect: true },
          { id: "q2-8-d", text: "5", isCorrect: false }
        ]
      }
    ],
    content: "<h2>Тест: Создание сцен</h2><p>Проверьте свои знания по созданию сцен в Unity.</p>",
    isCompleted: false
  },
  {
    id: "q3",
    lessonId: "l4",
    title: "Тест по физике",
    order: 1,
    questions: [
      {
        id: "q3-1",
        text: "Какой компонент добавляет физические свойства объекту?",
        options: [
          { id: "q3-1-a", text: "Collider", isCorrect: false },
          { id: "q3-1-b", text: "Rigidbody", isCorrect: true },
          { id: "q3-1-c", text: "Mesh Renderer", isCorrect: false },
          { id: "q3-1-d", text: "Transform", isCorrect: false }
        ]
      },
      {
        id: "q3-2",
        text: "Для чего нужен Collider?",
        options: [
          { id: "q3-2-a", text: "Для отображения объекта", isCorrect: false },
          { id: "q3-2-b", text: "Для определения столкновений", isCorrect: true },
          { id: "q3-2-c", text: "Для анимации", isCorrect: false },
          { id: "q3-2-d", text: "Для освещения", isCorrect: false }
        ]
      },
      {
        id: "q3-3",
        text: "Как сделать объект неподвижным (статичным)?",
        options: [
          { id: "q3-3-a", text: "Удалить Rigidbody", isCorrect: true },
          { id: "q3-3-b", text: "Установить Mass = 0", isCorrect: false },
          { id: "q3-3-c", text: "Убрать галочку Use Gravity", isCorrect: false },
          { id: "q3-3-d", text: "Установить Is Kinematic", isCorrect: false }
        ]
      },
      {
        id: "q3-4",
        text: "Какой физический движок использует Unity?",
        options: [
          { id: "q3-4-a", text: "Box2D", isCorrect: false },
          { id: "q3-4-b", text: "PhysX от NVIDIA", isCorrect: true },
          { id: "q3-4-c", text: "Bullet Physics", isCorrect: false },
          { id: "q3-4-d", text: "ODE", isCorrect: false }
        ]
      },
      {
        id: "q3-5",
        text: "Что делает свойство Mass в Rigidbody?",
        options: [
          { id: "q3-5-a", text: "Увеличивает размер объекта", isCorrect: false },
          { id: "q3-5-b", text: "Определяет массу объекта для физических расчетов", isCorrect: true },
          { id: "q3-5-c", text: "Изменяет скорость падения", isCorrect: false },
          { id: "q3-5-d", text: "Влияет на цвет объекта", isCorrect: false }
        ]
      },
      {
        id: "q3-6",
        text: "Какой тип коллайдера лучше использовать для сферы?",
        options: [
          { id: "q3-6-a", text: "Box Collider", isCorrect: false },
          { id: "q3-6-b", text: "Mesh Collider", isCorrect: false },
          { id: "q3-6-c", text: "Sphere Collider", isCorrect: true },
          { id: "q3-6-d", text: "Capsule Collider", isCorrect: false }
        ]
      },
      {
        id: "q3-7",
        text: "Как включить/выключить гравитацию для объекта?",
        options: [
          { id: "q3-7-a", text: "Изменить Gravity Scale в Rigidbody", isCorrect: false },
          { id: "q3-7-b", text: "Убрать/поставить галочку Use Gravity", isCorrect: true },
          { id: "q3-7-c", text: "Изменить Mass", isCorrect: false },
          { id: "q3-7-d", text: "Изменить Is Kinematic", isCorrect: false }
        ]
      },
      {
        id: "q3-8",
        text: "Для чего используется Joint?",
        options: [
          { id: "q3-8-a", text: "Для создания звуков", isCorrect: false },
          { id: "q3-8-b", text: "Для соединения объектов", isCorrect: true },
          { id: "q3-8-c", text: "Для анимации", isCorrect: false },
          { id: "q3-8-d", text: "Для освещения", isCorrect: false }
        ]
      },
      {
        id: "q3-9",
        text: "Какой метод вызывается при столкновении объектов?",
        options: [
          { id: "q3-9-a", text: "OnCollisionEnter", isCorrect: true },
          { id: "q3-9-b", text: "OnTriggerEnter", isCorrect: false },
          { id: "q3-9-c", text: "OnCollisionExit", isCorrect: false },
          { id: "q3-9-d", text: "OnCollisionStay", isCorrect: false }
        ]
      },
      {
        id: "q3-10",
        text: "Что такое Trigger в Unity?",
        options: [
          { id: "q3-10-a", text: "Кнопка на сцене", isCorrect: false },
          { id: "q3-10-b", text: "Коллайдер без физического столкновения", isCorrect: true },
          { id: "q3-10-c", text: "Тип анимации", isCorrect: false },
          { id: "q3-10-d", text: "Особый тип освещения", isCorrect: false }
        ]
      },
      {
        id: "q3-11",
        text: "Как изменить трение объекта?",
        options: [
          { id: "q3-11-a", text: "В Material → Dynamic Friction", isCorrect: true },
          { id: "q3-11-b", text: "В Rigidbody → Friction", isCorrect: false },
          { id: "q3-11-c", text: "В Collider → Friction", isCorrect: false },
          { id: "q3-11-d", text: "В Mesh Renderer → Friction", isCorrect: false }
        ]
      },
      {
        id: "q3-12",
        text: "Какой параметр влияет на отскок объекта?",
        options: [
          { id: "q3-12-a", text: "Bounciness", isCorrect: true },
          { id: "q3-12-b", text: "Elasticity", isCorrect: false },
          { id: "q3-12-c", text: "Rebound", isCorrect: false },
          { id: "q3-12-d", text: "Spring", isCorrect: false }
        ]
      }
    ],
    content: "<h2>Тест: Физический движок</h2><p>Проверьте свои знания о физике в Unity.</p>",
    isCompleted: false
  },
  {
    id: "q4",
    lessonId: "l5",
    title: "Тест: Гравитация и столкновения",
    order: 2,
    questions: [
      {
        id: "q4-1",
        text: "Какая стандартная гравитация в Unity по умолчанию?",
        options: [
          { id: "q4-1-a", text: "-9.81 по Y", isCorrect: true },
          { id: "q4-1-b", text: "-9.81 по X", isCorrect: false },
          { id: "q4-1-c", text: "0", isCorrect: false },
          { id: "q4-1-d", text: "9.81 по Y", isCorrect: false }
        ]
      },
      {
        id: "q4-2",
        text: "Как изменить глобальную гравитацию?",
        options: [
          { id: "q4-2-a", text: "Edit → Project Settings → Physics → Gravity", isCorrect: true },
          { id: "q4-2-b", text: "В Rigibody объекта", isCorrect: false },
          { id: "q4-2-c", text: "В настройках камеры", isCorrect: false },
          { id: "q4-2-d", text: "Window → Gravity Settings", isCorrect: false }
        ]
      },
      {
        id: "q4-3",
        text: "Какой метод вызывается при входе в триггер?",
        options: [
          { id: "q4-3-a", text: "OnCollisionEnter", isCorrect: false },
          { id: "q4-3-b", text: "OnTriggerEnter", isCorrect: true },
          { id: "q4-3-c", text: "OnCollisionStay", isCorrect: false },
          { id: "q4-3-d", text: "OnCollisionExit", isCorrect: false }
        ]
      },
      {
        id: "q4-4",
        text: "Как сделать коллайдер триггером?",
        options: [
          { id: "q4-4-a", text: "Поставить галочку Is Trigger в компоненте Collider", isCorrect: true },
          { id: "q4-4-b", text: "Добавить компонент Trigger", isCorrect: false },
          { id: "q4-4-c", text: "Изменить тип в Rigidbody", isCorrect: false },
          { id: "q4-4-d", text: "В настройках Physics", isCorrect: false }
        ]
      },
      {
        id: "q4-5",
        text: "Что происходит при столкновении двух объектов с Rigidbody?",
        options: [
          { id: "q4-5-a", text: "Они проходят сквозь друг друга", isCorrect: false },
          { id: "q4-5-b", text: "Они отскакивают друг от друга", isCorrect: true },
          { id: "q4-5-c", text: "Они исчезают", isCorrect: false },
          { id: "q4-5-d", text: "Они сливаются", isCorrect: false }
        ]
      },
      {
        id: "q4-6",
        text: "Какой параметр отвечает за силу отскока?",
        options: [
          { id: "q4-6-a", text: "Friction", isCorrect: false },
          { id: "q4-6-b", text: "Bounciness", isCorrect: true },
          { id: "q4-6-c", text: "Drag", isCorrect: false },
          { id: "q4-6-d", text: "Mass", isCorrect: false }
        ]
      },
      {
        id: "q4-7",
        text: "Как получить информацию о столкновении в методе OnCollisionEnter?",
        options: [
          { id: "q4-7-a", text: "Через параметр Collision", isCorrect: true },
          { id: "q4-7-b", text: "Через параметр Collider", isCorrect: false },
          { id: "q4-7-c", text: "Через параметр Rigidbody", isCorrect: false },
          { id: "q4-7-d", text: "Нужно вызвать GetComponent", isCorrect: false }
        ]
      },
      {
        id: "q4-8",
        text: "Можно ли использовать триггер без Rigidbody на другом объекте?",
        options: [
          { id: "q4-8-a", text: "Нет, обязательно нужен Rigidbody", isCorrect: false },
          { id: "q4-8-b", text: "Да, но только если другой объект имеет Rigidbody", isCorrect: true },
          { id: "q4-8-c", text: "Триггер работает всегда", isCorrect: false },
          { id: "q4-8-d", text: "Только в 2D режиме", isCorrect: false }
        ]
      }
    ],
    content: "<h2>Тест: Гравитация и столкновения</h2><p>Проверьте знания о гравитации и столкновениях в Unity.</p>",
    isCompleted: false
  },
  {
    id: "q5",
    lessonId: "l6",
    title: "Тест по C#",
    order: 1,
    questions: [
      {
        id: "q5-1",
        text: "Какой тип данных используется для целых чисел?",
        options: [
          { id: "q5-1-a", text: "float", isCorrect: false },
          { id: "q5-1-b", text: "int", isCorrect: true },
          { id: "q5-1-c", text: "string", isCorrect: false },
          { id: "q5-1-d", text: "bool", isCorrect: false }
        ]
      },
      {
        id: "q5-2",
        text: "Какой символ используется для вывода в консоль?",
        options: [
          { id: "q5-2-a", text: "echo", isCorrect: false },
          { id: "q5-2-b", text: "print()", isCorrect: false },
          { id: "q5-2-c", text: "Console.WriteLine()", isCorrect: true },
          { id: "q5-2-d", text: "System.out.println()", isCorrect: false }
        ]
      },
      {
        id: "q5-3",
        text: "Что делает оператор ++?",
        options: [
          { id: "q5-3-a", text: "Уменьшает значение на 1", isCorrect: false },
          { id: "q5-3-b", text: "Увеличивает значение на 1", isCorrect: true },
          { id: "q5-3-c", text: "Умножает на 2", isCorrect: false },
          { id: "q5-3-d", text: "Складывает две переменные", isCorrect: false }
        ]
      },
      {
        id: "q5-4",
        text: 'Какой оператор сравнения "равно"?',
        options: [
          { id: "q5-4-a", text: "=", isCorrect: false },
          { id: "q5-4-b", text: "==", isCorrect: true },
          { id: "q5-4-c", text: "===", isCorrect: false },
          { id: "q5-4-d", text: "equals", isCorrect: false }
        ]
      },
      {
        id: "q5-5",
        text: "Как объявить константу в C#?",
        options: [
          { id: "q5-5-a", text: "const int x = 5;", isCorrect: true },
          { id: "q5-5-b", text: "int constant x = 5;", isCorrect: false },
          { id: "q5-5-c", text: "final int x = 5;", isCorrect: false },
          { id: "q5-5-d", text: "static int x = 5;", isCorrect: false }
        ]
      },
      {
        id: "q5-6",
        text: "Какой тип данных для дробных чисел?",
        options: [
          { id: "q5-6-a", text: "int", isCorrect: false },
          { id: "q5-6-b", text: "double или float", isCorrect: true },
          { id: "q5-6-c", text: "decimal", isCorrect: false },
          { id: "q5-6-d", text: "number", isCorrect: false }
        ]
      },
      {
        id: "q5-7",
        text: "Как обозначается логическое значение в C#?",
        options: [
          { id: "q5-7-a", text: "boolean", isCorrect: false },
          { id: "q5-7-b", text: "bool", isCorrect: true },
          { id: "q5-7-c", text: "logical", isCorrect: false },
          { id: "q5-7-d", text: "bit", isCorrect: false }
        ]
      },
      {
        id: "q5-8",
        text: 'Какой оператор означает "не равно"?',
        options: [
          { id: "q5-8-a", text: "!=", isCorrect: true },
          { id: "q5-8-b", text: "<>", isCorrect: false },
          { id: "q5-8-c", text: "not =", isCorrect: false },
          { id: "q5-8-d", text: "/=", isCorrect: false }
        ]
      },
      {
        id: "q5-9",
        text: "Как объявить строковую переменную?",
        options: [
          { id: "q5-9-a", text: "str name = \"Alex\";", isCorrect: false },
          { id: "q5-9-b", text: "string name = \"Alex\";", isCorrect: true },
          { id: "q5-9-c", text: "String name = 'Alex';", isCorrect: false },
          { id: "q5-9-d", text: "text name = \"Alex\";", isCorrect: false }
        ]
      },
      {
        id: "q5-10",
        text: "Какой оператор логического И?",
        options: [
          { id: "q5-10-a", text: "and", isCorrect: false },
          { id: "q5-10-b", text: "&&", isCorrect: true },
          { id: "q5-10-c", text: "&", isCorrect: false },
          { id: "q5-10-d", text: "AND", isCorrect: false }
        ]
      }
    ],
    content: "<h2>Тест: Основы C#</h2><p>Проверьте свои знания основ языка программирования C#.</p>",
    isCompleted: false
  },
  {
    id: "q6",
    lessonId: "l7",
    title: "Тест: Классы и методы",
    order: 2,
    questions: [
      {
        id: "q6-1",
        text: "Какое ключевое слово используется для создания класса?",
        options: [
          { id: "q6-1-a", text: "class", isCorrect: true },
          { id: "q6-1-b", text: "object", isCorrect: false },
          { id: "q6-1-c", text: "struct", isCorrect: false },
          { id: "q6-1-d", text: "type", isCorrect: false }
        ]
      },
      {
        id: "q6-2",
        text: "Как называется метод, который вызывается при создании объекта?",
        options: [
          { id: "q6-2-a", text: "Create()", isCorrect: false },
          { id: "q6-2-b", text: "Init()", isCorrect: false },
          { id: "q6-2-c", text: "Start() или конструктор", isCorrect: true },
          { id: "q6-2-d", text: "New()", isCorrect: false }
        ]
      },
      {
        id: "q6-3",
        text: "Как создать экземпляр класса в C#?",
        options: [
          { id: "q6-3-a", text: "Player p = new Player();", isCorrect: true },
          { id: "q6-3-b", text: "Player p: Player.new()", isCorrect: false },
          { id: "q6-3-c", text: "new Player p;", isCorrect: false },
          { id: "q6-3-d", text: "Player p = Player.create();", isCorrect: false }
        ]
      },
      {
        id: "q6-4",
        text: "Какой модификатор доступа делает метод видимым везде?",
        options: [
          { id: "q6-4-a", text: "private", isCorrect: false },
          { id: "q6-4-b", text: "protected", isCorrect: false },
          { id: "q6-4-c", text: "public", isCorrect: true },
          { id: "q6-4-d", text: "internal", isCorrect: false }
        ]
      },
      {
        id: "q6-5",
        text: "Что такое наследование?",
        options: [
          { id: "q6-5-a", text: "Копирование кода из одного файла в другой", isCorrect: false },
          { id: "q6-5-b", text: "Класс получает свойства и методы другого класса", isCorrect: true },
          { id: "q6-5-c", text: "Создание интерфейса", isCorrect: false },
          { id: "q6-5-d", text: "Переименование класса", isCorrect: false }
        ]
      },
      {
        id: "q6-6",
        text: "Какое ключевое слово используется для наследования?",
        options: [
          { id: "q6-6-a", text: "inherits", isCorrect: false },
          { id: "q6-6-b", text: "base", isCorrect: false },
          { id: "q6-6-c", text: ":", isCorrect: true },
          { id: "q6-6-d", text: "extends", isCorrect: false }
        ]
      },
      {
        id: "q6-7",
        text: "Что делает ключевое слово void в методе?",
        options: [
          { id: "q6-7-a", text: "Метод возвращает число", isCorrect: false },
          { id: "q6-7-b", text: "Метод ничего не возвращает", isCorrect: true },
          { id: "q6-7-c", text: "Метод принимает параметры", isCorrect: false },
          { id: "q6-7-d", text: "Метод статический", isCorrect: false }
        ]
      },
      {
        id: "q6-8",
        text: "Как вызвать метод родительского класса?",
        options: [
          { id: "q6-8-a", text: "super.method()", isCorrect: false },
          { id: "q6-8-b", text: "parent.method()", isCorrect: false },
          { id: "q6-8-c", text: "base.method()", isCorrect: true },
          { id: "q6-8-d", text: "this.method()", isCorrect: false }
        ]
      }
    ],
    content: "<h2>Тест: Классы и методы</h2><p>Проверьте понимание объектно-ориентированного программирования.</p>",
    isCompleted: false
  },
  {
    id: "q7",
    lessonId: "l8",
    title: "Тест: Анимация",
    order: 1,
    questions: [
      {
        id: "q7-1",
        text: "Как называется компонент для управления анимацией в Unity?",
        options: [
          { id: "q7-1-a", text: "Animation", isCorrect: false },
          { id: "q7-1-b", text: "Animator", isCorrect: true },
          { id: "q7-1-c", text: "AnimationController", isCorrect: false },
          { id: "q7-1-d", text: "AnimController", isCorrect: false }
        ]
      },
      {
        id: "q7-2",
        text: "Что такое Animator Controller?",
        options: [
          { id: "q7-2-a", text: "Файл анимации", isCorrect: false },
          { id: "q7-2-b", text: "Граф состояний анимаций и переходов", isCorrect: true },
          { id: "q7-2-c", text: "Панель настройки анимации", isCorrect: false },
          { id: "q7-2-d", text: "Компонент для воспроизведения звуков", isCorrect: false }
        ]
      },
      {
        id: "q7-3",
        text: "Как создать анимацию в Unity?",
        options: [
          { id: "q7-3-a", text: "Правый клик в Project → Create → Animation", isCorrect: false },
          { id: "q7-3-b", text: "Window → Animation → щелкнуть по объекту → Create", isCorrect: true },
          { id: "q7-3-c", text: "Edit → Create Animation", isCorrect: false },
          { id: "q7-3-d", text: "Ctrl+A в Scene View", isCorrect: false }
        ]
      },
      {
        id: "q7-4",
        text: "Что такое State в Animator?",
        options: [
          { id: "q7-4-a", text: "Параметр анимации", isCorrect: false },
          { id: "q7-4-b", text: "Состояние (клип) анимации", isCorrect: true },
          { id: "q7-4-c", text: "Переход между анимациями", isCorrect: false },
          { id: "q7-4-d", text: "Слой анимации", isCorrect: false }
        ]
      },
      {
        id: "q7-5",
        text: "Как сделать переход между анимациями?",
        options: [
          { id: "q7-5-a", text: "Правый клик на состоянии → Make Transition", isCorrect: true },
          { id: "q7-5-b", text: "Ctrl+T", isCorrect: false },
          { id: "q7-5-c", text: "Двойной клик на состоянии", isCorrect: false },
          { id: "q7-5-d", text: "Drag and drop анимацию на другое состояние", isCorrect: false }
        ]
      },
      {
        id: "q7-6",
        text: "Какой тип параметра используется для переключения анимаций?",
        options: [
          { id: "q6-6-a", text: "String", isCorrect: false },
          { id: "q6-6-b", text: "Bool, Int или Trigger", isCorrect: true },
          { id: "q6-6-c", text: "Float", isCorrect: false },
          { id: "q6-6-d", text: "Double", isCorrect: false }
        ]
      },
      {
        id: "q7-7",
        text: "Что такое Blend Tree?",
        options: [
          { id: "q7-7-a", text: "Смешивание нескольких анимаций", isCorrect: true },
          { id: "q7-7-b", text: "Древовидная структура анимаций", isCorrect: false },
          { id: "q7-7-c", text: "Сохранение анимации", isCorrect: false },
          { id: "q7-7-d", text: "Экспорт анимации", isCorrect: false }
        ]
      },
      {
        id: "q7-8",
        text: "Как воспроизвести анимацию из скрипта?",
        options: [
          { id: "q7-8-a", text: "animation.Play(\"idle\")", isCorrect: false },
          { id: "q7-8-b", text: "animator.Play(\"idle\")", isCorrect: true },
          { id: "q7-8-c", text: "GetComponent(Animation).Play()", isCorrect: false },
          { id: "q7-8-d", text: "AnimationController.Play(\"idle\")", isCorrect: false }
        ]
      },
      {
        id: "q7-9",
        text: "Что такое Avatar в Unity анимации?",
        options: [
          { id: "q7-9-a", text: "Персонаж игры", isCorrect: false },
          { id: "q7-9-b", text: "Схема соответствия костей анимации", isCorrect: true },
          { id: "q7-9-c", text: "Текстура персонажа", isCorrect: false },
          { id: "q7-9-d", text: "Модель персонажа", isCorrect: false }
        ]
      },
      {
        id: "q7-10",
        text: "Какой компонент отвечает за скелетную анимацию?",
        options: [
          { id: "q7-10-a", text: "SkinnedMeshRenderer", isCorrect: true },
          { id: "q7-10-b", text: "MeshFilter", isCorrect: false },
          { id: "q7-10-c", text: "MeshRenderer", isCorrect: false },
          { id: "q7-10-d", text: "SkeletonRenderer", isCorrect: false }
        ]
      }
    ],
    content: "<h2>Тест: Анимация в Unity</h2><p>Проверьте знания по созданию анимаций.</p>",
    isCompleted: false
  }
];

export const pythonQuizzes: Quiz[] = [
  {
    id: "pq1",
    lessonId: "pl1",
    title: "Тест: Введение в Python",
    order: 1,
    questions: [
      {
        id: "pq1-1",
        text: "Какой командой выводится текст в Python?",
        options: [
          { id: "pq1-1-a", text: "echo \"Hello\"", isCorrect: false },
          { id: "pq1-1-b", text: "print(\"Hello\")", isCorrect: true },
          { id: "pq1-1-c", text: "System.out.println(\"Hello\")", isCorrect: false },
          { id: "pq1-1-d", text: "cout << \"Hello\"", isCorrect: false }
        ]
      },
      {
        id: "pq1-2",
        text: "Нужно ли указывать тип переменной в Python?",
        options: [
          { id: "pq1-2-a", text: "Да, обязательно", isCorrect: false },
          { id: "pq1-2-b", text: "Нет, Python автоматически определяет тип", isCorrect: true },
          { id: "pq1-2-c", text: "Только для чисел", isCorrect: false },
          { id: "pq1-2-d", text: "Только для строк", isCorrect: false }
        ]
      },
      {
        id: "pq1-3",
        text: "Какое расширение имеют файлы Python?",
        options: [
          { id: "pq1-3-a", text: ".py", isCorrect: true },
          { id: "pq1-3-b", text: ".python", isCorrect: false },
          { id: "pq1-3-c", text: ".pyt", isCorrect: false },
          { id: "pq1-3-d", text: ".p", isCorrect: false }
        ]
      },
      {
        id: "pq1-4",
        text: "Как запустить Python скрипт из командной строки?",
        options: [
          { id: "pq1-4-a", text: "run script.py", isCorrect: false },
          { id: "pq1-4-b", text: "python script.py", isCorrect: true },
          { id: "pq1-4-c", text: "start script.py", isCorrect: false },
          { id: "pq1-4-d", text: "execute script.py", isCorrect: false }
        ]
      },
      {
        id: "pq1-5",
        text: "Кто создал язык Python?",
        options: [
          { id: "pq1-5-a", text: "Гвидо ван Россум", isCorrect: true },
          { id: "pq1-5-b", text: "Бьёрн Страуструп", isCorrect: false },
          { id: "pq1-5-c", text: "Джеймс Гослинг", isCorrect: false },
          { id: "pq1-5-d", text: "Деннис Ритчи", isCorrect: false }
        ]
      }
    ],
    content: "<h2>Тест: Введение в Python</h2><p>Проверьте базовые знания о Python.</p>",
    isCompleted: false
  },
  {
    id: "pq2",
    lessonId: "pl2",
    title: "Тест: Типы данных",
    order: 2,
    questions: [
      {
        id: "pq2-1",
        text: "Какой тип данных для целых чисел в Python?",
        options: [
          { id: "pq2-1-a", text: "integer", isCorrect: true },
          { id: "pq2-1-b", text: "int", isCorrect: false },
          { id: "pq2-1-c", text: "long", isCorrect: false },
          { id: "pq2-1-d", text: "num", isCorrect: false }
        ]
      },
      {
        id: "pq2-2",
        text: "Какой тип данных для дробных чисел?",
        options: [
          { id: "pq2-2-a", text: "float", isCorrect: true },
          { id: "pq2-2-b", text: "double", isCorrect: false },
          { id: "pq2-2-c", text: "decimal", isCorrect: false },
          { id: "pq2-2-d", text: "fraction", isCorrect: false }
        ]
      },
      {
        id: "pq2-3",
        text: "Как создать список в Python?",
        options: [
          { id: "pq2-3-a", text: "(1, 2, 3)", isCorrect: false },
          { id: "pq2-3-b", text: "[1, 2, 3]", isCorrect: true },
          { id: "pq2-3-c", text: "{1, 2, 3}", isCorrect: false },
          { id: "pq2-3-d", text: "<1, 2, 3>", isCorrect: false }
        ]
      },
      {
        id: "pq2-4",
        text: "Какой тип данных для истинного/ложного?",
        options: [
          { id: "pq2-4-a", text: "bool", isCorrect: true },
          { id: "pq2-4-b", text: "boolean", isCorrect: false },
          { id: "pq2-4-c", text: "bit", isCorrect: false },
          { id: "pq2-4-d", text: "logical", isCorrect: false }
        ]
      },
      {
        id: "pq2-5",
        text: "Как получить тип переменной?",
        options: [
          { id: "pq2-5-a", text: "typeof(x)", isCorrect: false },
          { id: "pq2-5-b", text: "type(x)", isCorrect: true },
          { id: "pq2-5-c", text: "getType(x)", isCorrect: false },
          { id: "pq2-5-d", text: "x.type", isCorrect: false }
        ]
      }
    ],
    content: "<h2>Тест: Типы данных</h2><p>Проверьте знания о переменных и типах.</p>",
    isCompleted: false
  }
];

export const pythonLessons: Lesson[] = [
  {
    id: "pl1",
    moduleId: "m5",
    title: "Введение в Python",
    order: 1,
    summary: "Знакомство с языком Python, установка и настройка.",
    content: `
      <h2>Введение в Python</h2>
      <p>Python — популярный язык программирования, известный простым синтаксисом и универсальностью.</p>
      
      <h3>Установка Python:</h3>
      <p>Скачайте Python с официального сайта python.org и установите, отметив "Add to PATH".</p>
      
      <h3>Первая программа:</h3>
      <pre><code>print("Hello, World!")</code></pre>
    `,
    isCompleted: false
  },
  {
    id: "pl2",
    moduleId: "m5",
    title: "Переменные и типы",
    order: 2,
    summary: "Работа с переменными и базовыми типами данных.",
    content: `
      <h2>Переменные и типы данных</h2>
      <p>В Python переменные создаются при присваивании значения.</p>
      
      <h3>Основные типы:</h3>
      <ul>
        <li><strong>int</strong> — целые числа</li>
        <li><strong>float</strong> — дробные числа</li>
        <li><strong>str</strong> — строки</li>
        <li><strong>bool</strong> — логические значения</li>
      </ul>
    `,
    isCompleted: false
  },
  {
    id: "pl3",
    moduleId: "m6",
    title: "Операторы",
    order: 1,
    summary: "Арифметические и логические операторы.",
    content: `
      <h2>Операторы в Python</h2>
      <p>Операторы позволяют выполнять вычисления и сравнения.</p>
      
      <h3>Арифметические:</h3>
      <pre><code>+, -, *, /, //, %, **</code></pre>
    `,
    isCompleted: false
  },
  {
    id: "pl4",
    moduleId: "m7",
    title: "Функции",
    order: 1,
    summary: "Создание и использование функций.",
    content: `
      <h2>Функции</h2>
      <p>Функции позволяют многократно использовать код.</p>
      
      <pre><code>def greet(name):
    return f"Привет, {name}!"</code></pre>
    `,
    isCompleted: false
  }
];

export const pythonTasks: Task[] = [
  {
    id: "pt1",
    lessonId: "pl1",
    title: "Установить Python",
    description: "Установите Python и запустите первую программу.",
    content: "<h2>Задание: Установка Python</h2><p>Скачайте и установите Python, выведите 'Hello, World!'.</p>",
    order: 1,
    isCompleted: false
  },
  {
    id: "pt2",
    lessonId: "pl2",
    title: "Работа с переменными",
    description: "Создайте переменные разных типов.",
    content: "<h2>Задание: Переменные</h2><p>Создайте переменные name, age, isStudent и выведите их.</p>",
    order: 2,
    isCompleted: false
  }
];