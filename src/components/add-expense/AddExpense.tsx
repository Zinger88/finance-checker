import CloseIcon from '@mui/icons-material/Close';
import { Button, Radio, TextField } from '@mui/material';
import { userStore } from '../../store/userStore.ts';
import { addExpense } from '../../controllers/users.ts';

export const AddExpense = ({ onClose }: { onClose: any }) => {
    const categories = userStore((store) => store.categories);
    const user = userStore((store) => store.user);
    const onSubmit = async (e: any) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const expense = Number(form.expense.value);
        const category = form.category.value;
        const description = form.description.value;

        await addExpense({
            userId: user?.id as string,
            categoryId: category,
            amount: expense,
            description: description,
        });
        onClose();
    };

    return (
        <div className="expense">
            <div role="button" className="expense-close" onClick={onClose}>
                <CloseIcon />
            </div>
            <div className="expense-title">Добавить расход</div>
            <form onSubmit={onSubmit}>
                <TextField
                    required
                    name={'expense'}
                    label={'Сумма расхода'}
                    type={'number'}
                />
                <div className="expense-categories">
                    {categories.map((category: any) => {
                        return (
                            <div key={category.id}>
                                {category.name}
                                <Radio
                                    required={true}
                                    value={category.id}
                                    name="category"
                                />
                            </div>
                        );
                    })}
                </div>
                <TextField
                    name={'description'}
                    label={'Комментарий'}
                    type={'text'}
                />
                <Button
                    className={'expense-submit'}
                    variant={'contained'}
                    type={'submit'}
                >
                    Добавить
                </Button>
            </form>
        </div>
    );
};
