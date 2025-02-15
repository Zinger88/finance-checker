import {
    addExpenseFirebase,
    getExpensesForMonthFirebase,
    subscribeToExpensesFirebase,
} from '../db/firebase.ts';
import { Expense } from '../types.ts';

export const addExpense = async ({
    userId,
    categoryId,
    amount,
    description,
}: {
    userId: string;
    categoryId: string;
    amount: number;
    description: string;
}) => {
    await addExpenseFirebase({
        userId,
        categoryId,
        amount,
        description,
    });
};

export const getExpenses = (userId: string, callback: any): any => {
    subscribeToExpensesFirebase(userId, callback);
};

export const getExpensesForMonth = async (
    userId: string,
    year: number,
    month: number
): Promise<Expense[]> => {
    return getExpensesForMonthFirebase(userId, year, month);
};
