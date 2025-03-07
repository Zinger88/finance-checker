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
                {props.details.expenses.map(props.element)}
            </div>
        </div>
    );
}

export const Categories: FC = () => {
    const expenses = userStore((store) => store.expenses);
    const categoriesObject = groupByCategory(expenses, 'categoryId');
    const total = expenses.reduce((acc, item) => acc + item.amount, 0);
    const categories = userStore((store) => store.categories);
    const userSettings = userStore((store) => store.userSettings);
    const [details, setDetails] = useState<{
        expenses: any;
        categoryName: string;
    } | null>(null);
    console.log(categoriesObject);
    const handleCategoryClick = (categoryName: string, expenses: any) => () => {
        setDetails({ categoryName, expenses });
    };
    const onCloseDetails = () => {
        setDetails(null);
    };
    return (
        <div className={'categories'}>
            {details && (
                <CategoryDetails
                    onClick={onCloseDetails}
                    details={details}
                    element={(detail: any) => {
                        return (
                            <div
                                key={detail.date.seconds}
                                className="category-details-item"
                            >
                                <span>
                                    {detail.amount} {userSettings?.currency}
                                </span>
                                <span className="category-details-item-date">
                                    <TimestampDisplay
                                        seconds={detail.date.seconds}
                                    />
                                </span>
                                <span>{detail.description}</span>
                            </div>
                        );
                    }}
                />
            )}
            {categories.map((categoryItem: any) => {
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
            {categories.map((categoryItem: any) => {
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
