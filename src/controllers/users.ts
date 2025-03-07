import { SignUpErrorEnum } from '../shared/constants.ts';
import {
    auth,
    fetchUserDataFirebase,
    getCurrentUserFirebase,
    getUserSettingsFirebase,
    logoutFirebase,
    signInFirebase,
    signUpFirebase,
} from '../db/firebase.ts';
import { UserSettings } from '../shared/types.ts';

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
