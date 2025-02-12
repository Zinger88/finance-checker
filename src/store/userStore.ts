import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    settings: {
        categoriesOrder: string[];
    };
}

interface Expense {
    id: string;
    category: string;
    amount: number;
    date: string;
}

interface StoreState {
    user: User | null;
    expenses: Expense[];
    categories: any;
    setCategories: (categories: any) => void;
    setUser: (user: User | null) => void;
    setExpenses: (expenses: Expense[]) => void;
    clearStore: () => void;
}

export const userStore = create<StoreState>((set) => ({
    user: null,
    expenses: [],
    categories: [],
    setCategories: (categories) => set({ categories }),
    setUser: (user) => set({ user }),
    setExpenses: (expenses) => set({ expenses }),
    clearStore: () => set({ user: null, expenses: [] }),
}));
