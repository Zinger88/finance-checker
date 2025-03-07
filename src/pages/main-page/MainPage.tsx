import { Diagramm } from '../../widgets/diagramm/Diagramm.tsx';
import { Categories } from '../../widgets/categories/Categories.tsx';
import { useState } from 'react';
import { AddExpense } from '../../features/add-expense/AddExpense.tsx';
import { MonthPicker } from '../../widgets/month-picker/MonthPicker.tsx';
import { Add } from '@mui/icons-material';

export const MainPage = () => {
    const [showAddExpense, setShowAddExpense] = useState(false);
    console.log(' Main page >> render');
    return (
        <div className="main-page">
            <MonthPicker />
            <Diagramm />
            <Categories />
            <div className="actions">
                <div
                    role="button"
                    className="actions-add"
                    onClick={() => setShowAddExpense(true)}
                >
                    <Add />
                </div>
            </div>
            {showAddExpense && (
                <AddExpense onClose={() => setShowAddExpense(false)} />
            )}
        </div>
    );
};
