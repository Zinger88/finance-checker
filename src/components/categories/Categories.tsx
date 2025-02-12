import { FC } from 'react';
import { userStore } from '../../store/userStore.ts';
import { Category } from '../category/Category.tsx';
import { groupByCategory } from '../../utils.ts';

export const Categories: FC = () => {
    const expenses = userStore((store) => store.expenses);
    const categoriesObject = groupByCategory(expenses, 'categoryId');
    const total = expenses.reduce((acc, item) => acc + item.amount, 0);
    const categories = userStore((store) => store.categories);
    console.log({ categories, categoriesObject, expenses });
    return (
        <div className={'categories'}>
            {categories.map((categoryItem: any) => {
                const expenses = categoriesObject[categoryItem.id];
                if (!expenses) return null;
                const totalByCategory = expenses.reduce(
                    (acc: number, item: any) => acc + item.amount,
                    0
                );
                return (
                    <div key={categoryItem.id} className="category">
                        <Category
                            color={categoryItem.color}
                            title={categoryItem.name}
                            summ={totalByCategory}
                            total={total}
                        />
                    </div>
                );
            })}
        </div>
    );
};
