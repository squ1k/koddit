import { useSyncExternalStore } from "react";

import type { User } from "@/shared/types/user";

export type UserRole = User["role"];

type AppState = {
    user: User | null;
    pageTitle: string;
};

const state: AppState = {
    user: null,
    pageTitle: "",
};

const listeners = new Set<() => void>();

function notify() {
    listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function login(user: User) {
    state.user = user;

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
