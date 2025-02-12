export type User = {
    id: string;
    name: string;
    email: string;
    settings: {
        categoriesOrder: string[];
    };
};

export type Expense = {
    id: string;
    category: string;
    amount: number;
    date: string;
};
