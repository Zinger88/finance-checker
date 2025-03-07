import { create } from 'zustand';
import { User, UserSettings } from '../shared/types.ts';

interface Expense {
    id: string;
    category: string;
    amount: number;
    date: string;
}

interface StoreState {
    user: User | null;
    userSettings: UserSettings | null;
    expenses: Expense[];
    categories: any;
    setUserSettings: (userSettings: UserSettings) => void;
    setCategories: (categories: any) => void;
    setUser: (user: User | null) => void;
    setExpenses: (expenses: Expense[]) => void;
    clearStore: () => void;
}

export const userStore = create<StoreState>((set) => ({
    user: null,
    expenses: [],
    categories: [],
    userSettings: null,
    setUserSettings: (userSettings) => set({ userSettings }),
    setCategories: (categories) => set({ categories }),
    setUser: (user) => set({ user }),
    setExpenses: (expenses) => set({ expenses }),
    clearStore: () => set({ user: null, expenses: [] }),
}));
