import { Diagramm } from '../diagramm/Diagramm';
import { Categories } from '../categories/Categories.tsx';
import { useState } from 'react';
import { AddExpense } from '../add-expense/AddExpense.tsx';
import { MonthPicker } from '../month-picker/MonthPicker.tsx';

export const MainPage = () => {
    const [showAddExpense, setShowAddExpense] = useState(false);
    console.log(' Main page >> render');
    return (
        <div className="main-page">
            <MonthPicker />
            <Diagramm />
            <Categories />
            <div className="actions">
                <button
                    className="actions-add"
                    onClick={() => setShowAddExpense(true)}
                >
                    +
                </button>
            </div>
            {showAddExpense && (
                <AddExpense onClose={() => setShowAddExpense(false)} />
            )}
        </div>
    );
};
