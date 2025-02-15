import {
    addUserCategoryFirebase,
    getUserCategoriesFirebase,
} from '../db/firebase.ts';

export const getUserCategories = async (userId: string) => {
    const result = await getUserCategoriesFirebase(userId);
    console.log(result);
    return result;
};

export const addUserCategory = async (
    userId: string,
    categoryName: string,
    color: string = 'grey',
    icon: string = 'heart'
) => {
    console.log({ userId, categoryName, color, icon });
    return await addUserCategoryFirebase(userId, categoryName, color, icon);
};
