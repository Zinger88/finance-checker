import { SignUpErrorEnum } from '../constants';
import {
    addExpenseFirebase,
    auth,
    fetchUserDataFirebase,
    getCurrentUserFirebase,
    getExpensesForMonthFirebase,
    getUserCategoriesFirebase,
    getUserSettingsFirebase,
    logoutFirebase,
    signInFirebase,
    signUpFirebase,
    subscribeToExpensesFirebase,
} from '../db/firebase.ts';
import { Expense, UserSettings } from '../types.ts';

export const signUpUser = async (
    email: string,
    password: string,
    displayName: string
): Promise<{ error?: SignUpErrorEnum }> => {
    const result = await signUpFirebase(email, password, displayName);
    if (
        result.error &&
        result.error?.customData?._tokenResponse?.error?.message ===
            'EMAIL_EXISTS'
    ) {
        return {
            error: SignUpErrorEnum.ALREADY_EXIST,
        };
    }
    return {};
};

export const signInUser = async (email: string, password: string) => {
    const result = signInFirebase(email, password);
    return result;
};

export const logOutUser = () => {
    logoutFirebase();
};

export const getCurrentUser = (callback: (user: any | null) => void) => {
    return getCurrentUserFirebase(callback);
};

export const fetchUserData = async (userId: string): Promise<any> => {
    return fetchUserDataFirebase(userId);
};

export const getUserSettings = async (
    userId: string
): Promise<UserSettings | null> => {
    return getUserSettingsFirebase(userId);
};

export const getAuth = () => {
    return auth;
};

export const getUserCategories = async (userId: string) => {
    const result = await getUserCategoriesFirebase(userId);
    console.log(result);
    return result;
};

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
