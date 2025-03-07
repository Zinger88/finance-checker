export type User = {
    id: string;
    name: string;
    email: string;
};

export type UserSettings = {
    userId: string;
    currency: string;
    defaultPeriod: string;
    theme: string;
    categoryOrder: string[];
};

export type Expense = {
    id: string;
    category: string;
    amount: number;
    date: string;
};
