export interface AttendanceRecord {
    lessonId: string;
    studentId: string;
    courseId: string;
    attended: boolean;
    date: string;
}

export const attendance: AttendanceRecord[] = [
    // Unity (c1) - student s1
    {
        lessonId: "Урок 1",
        studentId: "s1",
        courseId: "c1",
        attended: true,
        date: "2026-03-12"
    },
    {
        lessonId: "Урок 2",
        studentId: "s1",
        courseId: "c1",
        attended: true,
        date: "2026-03-15"
    },
    {
        lessonId: "Урок 3",
        studentId: "s1",
        courseId: "c1",
        attended: true,
        date: "2026-03-19"
    },
    {
        lessonId: "Урок 4",
        studentId: "s1",
        courseId: "c1",
        attended: false,
        date: "2026-03-22"
    },
    {
        lessonId: "Урок 5",
        studentId: "s1",
        courseId: "c1",
        attended: true,
        date: "2026-03-26"
    },
    {
        lessonId: "Урок 6",
        studentId: "s1",
        courseId: "c1",
        attended: true,
        date: "2026-03-29"
    },
    {
        lessonId: "Урок 7",
        studentId: "s1",
        courseId: "c1",
        attended: false,
        date: "2026-04-02"
    },
    {
        lessonId: "Урок 8",
        studentId: "s1",
        courseId: "c1",
        attended: true,
        date: "2026-04-05"
    },
    {
        lessonId: "Урок 9",
        studentId: "s1",
        courseId: "c1",
        attended: true,
        date: "2026-04-09"
    },
    {
        lessonId: "Урок 10",
        studentId: "s1",
        courseId: "c1",
        attended: true,
        date: "2026-04-12"
    },
    {
        lessonId: "Урок 11",
        studentId: "s1",
        courseId: "c1",
        attended: true,
        date: "2026-04-16"
    },
    {
        lessonId: "Урок 12",
        studentId: "s1",
        courseId: "c1",
        attended: false,
        date: "2026-04-19"
    },
    {
        lessonId: "Урок 13",
        studentId: "s1",
        courseId: "c1",
        attended: true,
        date: "2026-04-23"
    },
    {
        lessonId: "Урок 14",
        studentId: "s1",
        courseId: "c1",
        attended: true,
        date: "2026-04-26"
    },
    {
        lessonId: "Урок 15",
        studentId: "s1",
        courseId: "c1",
        attended: true,
        date: "2026-05-02"
    },
    {
        lessonId: "Урок 16",
        studentId: "s1",
        courseId: "c1",
        attended: true,
        date: "2026-05-05"
    },
    // Python (c2) - student s1 - ~86% attendance
    {
        lessonId: "Урок 1",
        studentId: "s1",
        courseId: "c2",
        attended: true,
        date: "2026-03-14"
    },
    {
        lessonId: "Урок 2",
        studentId: "s1",
        courseId: "c2",
        attended: true,
        date: "2026-03-17"
    },
    {
        lessonId: "Урок 3",
        studentId: "s1",
        courseId: "c2",
        attended: true,
        date: "2026-03-21"
    },
    {
        lessonId: "Урок 4",
        studentId: "s1",
        courseId: "c2",
        attended: false,
        date: "2026-03-24"
    },
    {
        lessonId: "Урок 5",
        studentId: "s1",
        courseId: "c2",
        attended: true,
        date: "2026-03-28"
    },
    {
        lessonId: "Урок 6",
        studentId: "s1",
        courseId: "c2",
        attended: true,
        date: "2026-03-31"
    },
    {
        lessonId: "Урок 7",
        studentId: "s1",
        courseId: "c2",
        attended: true,
        date: "2026-04-04"
    },
    {
        lessonId: "Урок 8",
        studentId: "s1",
        courseId: "c2",
        attended: true,
        date: "2026-04-07"
    },
    {
        lessonId: "Урок 9",
        studentId: "s1",
        courseId: "c2",
        attended: true,
        date: "2026-04-11"
    },
    {
        lessonId: "Урок 10",
        studentId: "s1",
        courseId: "c2",
        attended: false,
        date: "2026-04-14"
    },
    {
        lessonId: "Урок 11",
        studentId: "s1",
        courseId: "c2",
        attended: true,
        date: "2026-04-18"
    },
    {
        lessonId: "Урок 12",
        studentId: "s1",
        courseId: "c2",
        attended: true,
        date: "2026-04-21"
    },
    {
        lessonId: "Урок 13",
        studentId: "s1",
        courseId: "c2",
        attended: true,
        date: "2026-04-25"
    },
    {
        lessonId: "Урок 14",
        studentId: "s1",
        courseId: "c2",
        attended: true,
        date: "2026-04-28"
    },
    // Цифровая грамотность (c3) - student s1 - 72% attendance (18/25)
    { lessonId: "Урок 1", studentId: "s1", courseId: "c3", attended: true, date: "2026-01-10" },
    { lessonId: "Урок 2", studentId: "s1", courseId: "c3", attended: true, date: "2026-01-13" },
    { lessonId: "Урок 3", studentId: "s1", courseId: "c3", attended: true, date: "2026-01-17" },
    { lessonId: "Урок 4", studentId: "s1", courseId: "c3", attended: true, date: "2026-01-20" },
    { lessonId: "Урок 5", studentId: "s1", courseId: "c3", attended: false, date: "2026-01-24" },
    { lessonId: "Урок 6", studentId: "s1", courseId: "c3", attended: true, date: "2026-01-27" },
    { lessonId: "Урок 7", studentId: "s1", courseId: "c3", attended: true, date: "2026-01-31" },
    { lessonId: "Урок 8", studentId: "s1", courseId: "c3", attended: false, date: "2026-02-03" },
    { lessonId: "Урок 9", studentId: "s1", courseId: "c3", attended: true, date: "2026-02-07" },
    { lessonId: "Урок 10", studentId: "s1", courseId: "c3", attended: true, date: "2026-02-10" },
    { lessonId: "Урок 11", studentId: "s1", courseId: "c3", attended: true, date: "2026-02-14" },
    { lessonId: "Урок 12", studentId: "s1", courseId: "c3", attended: false, date: "2026-02-17" },
    { lessonId: "Урок 13", studentId: "s1", courseId: "c3", attended: true, date: "2026-02-21" },
    { lessonId: "Урок 14", studentId: "s1", courseId: "c3", attended: true, date: "2026-02-24" },
    { lessonId: "Урок 15", studentId: "s1", courseId: "c3", attended: false, date: "2026-02-28" },
    { lessonId: "Урок 16", studentId: "s1", courseId: "c3", attended: true, date: "2026-03-03" },
    { lessonId: "Урок 17", studentId: "s1", courseId: "c3", attended: false, date: "2026-03-07" },
    { lessonId: "Урок 18", studentId: "s1", courseId: "c3", attended: true, date: "2026-03-10" },
    { lessonId: "Урок 19", studentId: "s1", courseId: "c3", attended: true, date: "2026-03-14" },
    { lessonId: "Урок 20", studentId: "s1", courseId: "c3", attended: true, date: "2026-03-17" },
    { lessonId: "Урок 21", studentId: "s1", courseId: "c3", attended: true, date: "2026-03-21" },
    { lessonId: "Урок 22", studentId: "s1", courseId: "c3", attended: false, date: "2026-03-24" },
    { lessonId: "Урок 23", studentId: "s1", courseId: "c3", attended: true, date: "2026-03-28" },
    { lessonId: "Урок 24", studentId: "s1", courseId: "c3", attended: true, date: "2026-03-31" },
    { lessonId: "Урок 25", studentId: "s1", courseId: "c3", attended: true, date: "2026-04-04" }
];

export function getAttendanceForCourse(courseId: string, studentId: string): AttendanceRecord[] {
    return attendance.filter(a => a.courseId === courseId && a.studentId === studentId);
}

export function isLessonAttended(lessonTitle: string, studentId: string): boolean {
    const record = attendance.find(a => a.lessonId === lessonTitle && a.studentId === studentId);
    return record?.attended ?? false;
}