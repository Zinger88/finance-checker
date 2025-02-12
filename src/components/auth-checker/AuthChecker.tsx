import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { userStore } from '../../store/userStore';
import {
    getCurrentUser,
    fetchUserData,
    getUserCategories,
    getExpenses,
} from '../../controllers/users';
import CircularProgress from '@mui/material/CircularProgress';

export const AuthChecker = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const setUser = userStore((state) => state.setUser);
    const setExpenses = userStore((state) => state.setExpenses);
    const setCategories = userStore((state) => state.setCategories);
    useEffect(() => {
        let unsubscribeExpenses: (() => any) | null = null;
        const unsubscribeUser = getCurrentUser(async (user) => {
            const userId = user?.uid;
            if (userId) {
                try {
                    const { user: userData } = await fetchUserData(userId);
                    const categories = await getUserCategories(userId);
                    unsubscribeExpenses = getExpenses(userId, setExpenses);
                    setCategories(categories);
                    setUser(userData);
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
            if (unsubscribeExpenses !== null) {
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
                <CircularProgress />
            </div>
        );

    return <>{children}</>;
};
