import { FC, useState } from 'react';
import { userStore } from '../../store/userStore.ts';
import { Category } from '../../features/category/Category.tsx';
import { groupByCategory } from '../../shared/utils.ts';
import CloseIcon from '@mui/icons-material/Close';

function CategoryDetails(props: {
    onClick: () => void;
    details: { expenses: any; categoryName: string };
    element: (detail: any) => JSX.Element;
}) {
    const sortedExpenses: any = JSON.parse(
        JSON.stringify(props.details.expenses)
    ).sort((a: any, b: any) => {
        if (b.date.seconds !== a.date.seconds) {
            return b.date.seconds - a.date.seconds;
        }
        return b.date.nanoseconds - a.date.nanoseconds;
    });
    return (
        <div className="category-details">
            <div
                role="button"
                onClick={props.onClick}
                className="category-details-close"
            >
                <CloseIcon />
            </div>
            <div className="category-details-title">
                {props.details.categoryName}
            </div>
            <div className="category-details-list">
                {sortedExpenses.map(props.element)}
            </div>
        </div>
    );
}

export const Categories: FC = () => {
    const expenses = userStore((store) => store.expenses);
    const categoriesObject = groupByCategory(expenses, 'categoryId');
    const total = expenses.reduce((acc, item) => acc + item.amount, 0);
    const categories = userStore((store) => store.categories);
    console.log({ categories, categoriesObject });
    const userSettings = userStore((store) => store.userSettings);
    const [detailsByCategory, setDetailsByCategory] = useState<{
        expenses: any;
        categoryName: string;
    } | null>(null);
    const handleCategoryClick = (categoryName: string, expenses: any) => () => {
        setDetailsByCategory({ categoryName, expenses: expenses });
    };
    const onCloseDetails = () => {
        setDetailsByCategory(null);
    };
    return (
        <div className={'categories'}>
            {detailsByCategory && (
                <CategoryDetails
                    onClick={onCloseDetails}
                    details={detailsByCategory}
                    element={(detail: any) => {
                        return (
                            <div
                                key={detail.date.seconds}
                                className="category-details-item"
                            >
                                <span
                                    className={'category-details-item-amount'}
                                >
                                    {detail.amount} {userSettings?.currency}
                                </span>
                                <span className="category-details-item-date">
                                    <TimestampDisplay
                                        seconds={detail.date.seconds}
                                    />
                                </span>
                                <span className={'category-details-item-desc'}>
                                    {detail.description}
                                </span>
                            </div>
                        );
                    }}
                />
            )}
            {categories
                .filter((item: any) => {
                    return categoriesObject[item.id];
                })
                .sort((a: any, b: any) => {
                    const expensesA = categoriesObject[a.id];
                    if (!expensesA) return;
                    const totalA = expensesA.reduce(
                        (acc: number, item: any) => acc + item.amount,
                        0
                    );
                    const expensesB = categoriesObject[b.id];
                    if (!expensesB) return;
                    const totalB = expensesB.reduce(
                        (acc: number, item: any) => acc + item.amount,
                        0
                    );
                    return totalB - totalA;
                })
                .map((categoryItem: any) => {
                    const expenses = categoriesObject[categoryItem.id];
                    if (!expenses) return null;
                    const totalByCategory = expenses.reduce(
                        (acc: number, item: any) => acc + item.amount,
                        0
                    );
                    return (
                        <div
                            onClick={handleCategoryClick(
                                categoryItem.name,
                                expenses
                            )}
                            key={categoryItem.id}
                            className="categories-item"
                        >
                            <Category
                                icon={categoryItem.icon}
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

const TimestampDisplay = ({
    seconds,
}: {
    seconds: number;
    nanoseconds?: number;
}) => {
    const date = new Date(seconds * 1000);
    const formattedDate = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return <div>{formattedDate}</div>;
};
