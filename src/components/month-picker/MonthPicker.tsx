import { useEffect, useState } from 'react';
import { getExpensesForMonth } from '../../controllers/users.ts';
import { userStore } from '../../store/userStore.ts';
import { Button } from '@mui/material';

export const MonthPicker = () => {
    const userId = userStore((store) => store.user?.id);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const setExpenses = userStore((store) => store.setExpenses);
    const fetchExpenses = async (year: number, month: number) => {
        if (!userId) return;
        const data = await getExpensesForMonth(userId, year, month);
        setExpenses(data);
    };

    useEffect(() => {
        void fetchExpenses(selectedDate.getFullYear(), selectedDate.getMonth());
    }, [selectedDate]);

    const changeMonth = (delta: number) => {
        setSelectedDate((prev) => {
            const newDate = new Date(
                prev.getFullYear(),
                prev.getMonth() + delta,
                1
            );
            return newDate;
        });
    };

    return (
        <div className="month-picker">
            <div className="month-picker-title">
                📅{' '}
                {selectedDate.toLocaleString('ru-RU', {
                    month: 'long',
                    year: 'numeric',
                })}
            </div>
            <div className="month-picker-buttons">
                <Button
                    className="month-picker-button"
                    onClick={() => changeMonth(-1)}
                >
                    ⬅ Предыдущий
                </Button>
                <Button
                    className="month-picker-button"
                    onClick={() => changeMonth(1)}
                >
                    Следующий ➡
                </Button>
            </div>
        </div>
    );
};
