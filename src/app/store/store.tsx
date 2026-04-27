import { useSyncExternalStore } from "react";

import type { User } from "@/shared/types/user";
import type { Message } from "@/shared/types/message";
import { students } from "@/entities/student/model/students";
import { enrollments as allEnrollments } from "@/entities/enrollment/model/enrollments";
import { courses } from "@/entities/course/model/courses";
import { messages as allMessages } from "@/entities/message/model/messages";

export type UserRole = User["role"];

export type QuizResult = {
    quizId: string;
    correctCount: string;
    total: string;
};

const QUIZ_RESULTS_KEY = "koddit_quiz_results";
const VIEWED_CONTENT_KEY = "koddit_viewed_content";
const LOCAL_BALANCE_KEY = "koddit_balance";
const LOCAL_ENROLLMENTS_KEY = "koddit_enrollments";
const SESSION_MESSAGES_KEY = "koddit_session_messages";

function getStoredQuizResults(): Record<string, QuizResult> {
    try {
        const stored = sessionStorage.getItem(QUIZ_RESULTS_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}

function saveQuizResult(quizId: string, correctCount: number, total: number) {
    const results = getStoredQuizResults();
    results[quizId] = { quizId, correctCount: correctCount.toString(), total: total.toString() };
    sessionStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(results));
    notifyListeners();
}

export { saveQuizResult };

export function getQuizResult(quizId: string): QuizResult | undefined {
    return getStoredQuizResults()[quizId];
}

export function getAllQuizResults(): Record<string, QuizResult> {
    return getStoredQuizResults();
}

function getStoredViewedContent(): Record<string, boolean> {
    try {
        const stored = sessionStorage.getItem(VIEWED_CONTENT_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}

export function markContentViewed(contentId: string) {
    const viewed = getStoredViewedContent();
    viewed[contentId] = true;
    sessionStorage.setItem(VIEWED_CONTENT_KEY, JSON.stringify(viewed));
    notifyListeners();
}

export function isContentViewed(contentId: string): boolean {
    return getStoredViewedContent()[contentId] === true;
}

export function getAllViewedContent(): Record<string, boolean> {
    return getStoredViewedContent();
}

function setLocalBalance(studentId: string, balance: number) {
    const balances = getAllLocalBalances();
    balances[studentId] = balance;
    localStorage.setItem(LOCAL_BALANCE_KEY, JSON.stringify(balances));
}

export function getAllLocalBalances(): Record<string, number> {
    try {
        const stored = localStorage.getItem(LOCAL_BALANCE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}

function getLocalEnrollmentsData(): Record<string, { paid: boolean; paidUntil?: string }> {
    try {
        const stored = localStorage.getItem(LOCAL_ENROLLMENTS_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}

function setLocalEnrollment(enrollmentId: string, data: { paid: boolean; paidUntil?: string }) {
    const enrollments = getLocalEnrollmentsData();
    enrollments[enrollmentId] = data;
    localStorage.setItem(LOCAL_ENROLLMENTS_KEY, JSON.stringify(enrollments));
}

export function getLocalEnrollments(): Record<string, { paid: boolean; paidUntil?: string }> {
    return getLocalEnrollmentsData();
}

function getSessionMessages(): Message[] {
    try {
        const stored = sessionStorage.getItem(SESSION_MESSAGES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function addSessionMessage(message: Message) {
    const msgs = getSessionMessages();
    msgs.push(message);
    sessionStorage.setItem(SESSION_MESSAGES_KEY, JSON.stringify(msgs));
    notifyListeners();
}

export function getAllMessages(): Message[] {
    return [...allMessages, ...getSessionMessages()];
}

export function getChatMessages(chatId: string): Message[] {
    return getAllMessages().filter(m => m.chatId === chatId);
}

type AppState = {
    user: User | null;
    pageTitle: string;
    quizResults: Record<string, QuizResult>;
    balance: number;
    usersCount: number;
};

const state: AppState = {
    user: null,
    pageTitle: "",
    quizResults: getStoredQuizResults(),
    balance: 0,
    usersCount: 0,
};

const listeners = new Set<() => void>();

function notify() {
    listeners.forEach((listener) => listener());
}

function notifyListeners() {
    state.quizResults = getStoredQuizResults();
    notify();
}

export function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
}

export function login(user: User) {
    state.user = user;
    const student = students.find(s => s.id === user.profileId);
    const localBalances = getAllLocalBalances();
    const localBalance = localBalances[user.profileId];
    state.balance = localBalance ?? student?.balance ?? 0;
    setLocalBalance(user.profileId, state.balance);
    notify();
}

export function logout() {
    state.user = null;
    notify();
}

export function useUser() {
    return useSyncExternalStore(subscribe, () => state.user);
}

export function setPageTitle(title: string) {
    state.pageTitle = title;
    notify();
}

export function usePageTitle() {
    return useSyncExternalStore(subscribe, () => state.pageTitle);
}

export function useQuizResults() {
    return useSyncExternalStore(subscribe, () => state.quizResults);
}

export function getQuizResultById(quizId: string): QuizResult | undefined {
    return state.quizResults[quizId];
}

export function useBalance() {
    return useSyncExternalStore(subscribe, () => state.balance);
}

export function useUsersCount() {
    return useSyncExternalStore(subscribe, () => state.usersCount);
}

export function incrementUsersCount() {
    state.usersCount += 1;
    notify();
}

export function topUpBalance(amount: number) {
    if (!state.user) return;
    state.balance += amount;
    setLocalBalance(state.user.profileId, state.balance);
    notify();
}

export function payForCourse(enrollmentId: string, studentId: string): { success: boolean; message: string } {
    const localEnrollments = getLocalEnrollmentsData();
    const currentEnrollment = localEnrollments[enrollmentId];
    
    if (currentEnrollment?.paid) {
        return { success: false, message: "Курс уже оплачен" };
    }

    const enrollment = allEnrollments.find(e => e.id === enrollmentId && e.studentId === studentId);
    if (!enrollment) {
        return { success: false, message: "Запись не найдена" };
    }

    const courseData = courses.find(c => c.id === enrollment.courseId);
    const price = courseData?.price || 0;

    if (state.balance < price) {
        return { success: false, message: "Недостаточно средств на балансе" };
    }

    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const paidUntil = nextMonth.toISOString().split('T')[0];

    state.balance -= price;
    setLocalBalance(studentId, state.balance);
    
    setLocalEnrollment(enrollmentId, { paid: true, paidUntil });
    
    enrollment.paid = true;
    enrollment.paidUntil = paidUntil;

    notify();
    return { success: true, message: `Курс оплачен до ${paidUntil}` };
}