import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { userStore } from '../../store/userStore.ts';
import {
    getCurrentUser,
    getExpenses,
    getUserCategories,
    getUserSettings,
} from '../../controllers';
import CircularProgress from '@mui/material/CircularProgress';

export const AuthChecker = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const setUser = userStore((state) => state.setUser);
    const setUserSettings = userStore((state) => state.setUserSettings);
    const setExpenses = userStore((state) => state.setExpenses);
    const setCategories = userStore((state) => state.setCategories);
    useEffect(() => {
        let unsubscribeExpenses: (() => any) | null = null;
        const unsubscribeUser = getCurrentUser(async (user) => {
            const userId = user?.uid;
            if (userId) {
                try {
                    //const { user: userData } = await fetchUserData(userId);
                    const userSettings = await getUserSettings(userId);
                    if (userSettings) {
                        console.log(userSettings);
                        setUserSettings(userSettings);
                    }
                    const categories = await getUserCategories(userId);
                    unsubscribeExpenses = getExpenses(userId, setExpenses);
                    setCategories(categories);
                    setUser({
                        id: user.uid,
                        name: user.displayName,
                        email: user.email,
                    });
                    navigate('/');
                } catch {
                    console.warn('Ошибка загрузки данных пользователя');
                    navigate('/sign-in');
                }
            } else {
                if (location.pathname !== '/sign-up') {
                    navigate('/sign-in');
                }
            }
            setLoading(false);
        });

        return () => {
            unsubscribeUser();
            if (
                unsubscribeExpenses !== null &&
                typeof unsubscribeExpenses === 'function'
            ) {
                unsubscribeExpenses();
            }
        };
    }, [setUser, setExpenses]);

    if (loading)
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                }}
            >
                <CircularProgress color="inherit" />
            </div>
        );

    return <>{children}</>;
};
