import { initializeApp } from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    Timestamp,
    where,
} from 'firebase/firestore';
import { Expense, UserSettings } from '../types.ts';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCLHUDDC4K1F_ObO9l3OPm_r9e9bEGGgNc',
    authDomain: 'finance-klnr.firebaseapp.com',
    projectId: 'finance-klnr',
    storageBucket: 'finance-klnr.firebasestorage.app',
    messagingSenderId: '222580620713',
    appId: '1:222580620713:web:3f7b020d77594f683e98b8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signUpFirebase = async (
    email: string,
    password: string,
    displayName: string
): Promise<{ error?: Record<string, any> }> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            displayName,
            createdAt: Timestamp.now(),
        });

        await setDoc(doc(db, 'user_settings', user.uid), {
            userId: user.uid,
            categoryOrder: ['global_1', 'global_2', 'global_3'],
            currency: 'byn',
            theme: 'light',
        });
        console.log('Пользователь зарегистрирован:', user);
        return {};
    } catch (error: any) {
        return { error: error };
    }
};

export const signInFirebase = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log('Вход выполнен:', userCredential.user);
        return {};
    } catch (error: any) {
        console.error('Ошибка входа:', error.message);
        return {
            error: error,
        };
    }
};

export const logoutFirebase = async () => {
    try {
        await signOut(auth);
        console.log('Выход выполнен');
    } catch (error: any) {
        console.error('Ошибка выхода:', error.message);
    }
};

export const getCurrentUserFirebase = (
    callback: (user: any | null) => void
) => {
    return onAuthStateChanged(auth, callback);
};

const USER_SETTINGS_LS_KEY = 'finance-klnr-user-settings';
export const getUserSettingsFirebase = async (
    userId: string
): Promise<UserSettings | null> => {
    let result: UserSettings | null = null;
    try {
        const settingsFromLocalStorage =
            localStorage.getItem(USER_SETTINGS_LS_KEY);
        if (settingsFromLocalStorage) {
            result = JSON.parse(settingsFromLocalStorage);
        } else {
            const userSettingsRef = doc(db, 'users_settings', userId);
            const userSettingsSnap = await getDoc(userSettingsRef);
            const userSettings = userSettingsSnap.data();
            result = userSettings as UserSettings;
        }
    } catch (e) {
        console.log('no user found', e);
    }
    return result;
};

// export const setUserSettings = async (userSettings: UserSettings) => {
//     localStorage.setItem(USER_SETTINGS_LS_KEY, JSON.stringify(userSettings));
// };

export const fetchUserDataFirebase = async (userId: string) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
            throw new Error('Нет данных о пользователе');
        }
        const userData = userSnap.data();
        console.log(userData);
        return { user: { ...userData, id: userId } };
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        throw error;
    }
};

export const getUserCategoriesFirebase = async (userId: string) => {
    try {
        const commonRef = collection(db, 'common_categories');
        const userRef = collection(db, 'user_categories');

        const commonSnap = await getDocs(commonRef);
        const commonCategories = commonSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            type: 'common',
        }));
        console.log(userRef, userId);
        const userQuery = query(userRef, where('userId', '==', userId));

        const userSnap = await getDocs(userQuery);
        const userCategories = userSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            type: 'user',
        }));

        const resultCategories = [...commonCategories, ...userCategories];
        return resultCategories;
    } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
    }
};

export function subscribeToExpensesFirebase(userId: string, callback: any) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
    );

    const startTimestamp = Timestamp.fromDate(startOfMonth);
    const endTimestamp = Timestamp.fromDate(endOfMonth);

    const q = query(
        collection(db, 'expenses'),
        where('userId', '==', userId),
        where('date', '>=', startTimestamp),
        where('date', '<=', endTimestamp)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const expenses = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(expenses);
    });

    return unsubscribe;
}

export async function getExpensesForMonthFirebase(
    userId: string,
    year: number,
    month: number
): Promise<Expense[]> {
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

    const startTimestamp = Timestamp.fromDate(startOfMonth);
    const endTimestamp = Timestamp.fromDate(endOfMonth);

    const q = query(
        collection(db, 'expenses'),
        where('userId', '==', userId),
        where('date', '>=', startTimestamp),
        where('date', '<=', endTimestamp)
    );

    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return result as Expense[];
}

export const addExpenseFirebase = async ({
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
    try {
        const docRef = await addDoc(collection(db, 'expenses'), {
            userId: userId,
            categoryId: categoryId,
            amount: amount,
            description: description,
            date: serverTimestamp(), // Автоматический timestamp
        });

        console.log('Расход добавлен с ID:', docRef.id);
    } catch (error) {
        console.error('Ошибка при добавлении расхода:', error);
    }
};

export const addUserCategoryFirebase = async (
    userId: string,
    categoryName: string,
    color: string = 'grey',
    icon: string = 'heart'
) => {
    try {
        const docRef = await addDoc(collection(db, 'user_categories'), {
            userId: userId,
            id: crypto.randomUUID(),
            name: categoryName,
            color: color,
            icon: icon,
        });

        console.log('Категория добавлена:', docRef.id);
    } catch (error) {
        console.error('Ошибка при добавлении категории:', error);
    }
};
