import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { userStore } from '../../store/userStore.ts';
import { addUserCategory } from '../../controllers';

export const AddCategory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = userStore((store) => store.user);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const userId = user?.id;
        const categoryName = form.category.value;
        const color = form.color.value;
        const icon = form.icon.value;
        if (userId) {
            await addUserCategory(userId, categoryName, color, icon);
        } else {
            console.log('Something went wrong with adding category');
        }
    };

    return (
        <>
            {isModalOpen && (
                <div>
                    <form onSubmit={onSubmit}>
                        <h2>Add category</h2>

                        <TextField
                            label={'Название категории'}
                            name={'category'}
                            type={'text'}
                        />
                        <TextField
                            label={'Цвет категории'}
                            name={'color'}
                            type={'text'}
                        />
                        <TextField
                            label={'Иконка категории'}
                            name={'icon'}
                            type={'text'}
                        />
                        <Button type="submit">Добавить категорию</Button>
                    </form>
                </div>
            )}
            <Button onClick={() => setIsModalOpen(true)}>Add category</Button>
        </>
    );
};
