import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { userStore } from '../../store/userStore.ts';
import { arrayToObject, groupByCategory } from '../../utils.ts';

export const Diagramm = () => {
    const expenses = userStore((store) => store.expenses);
    const categoriesArr = userStore((store) => store.categories);
    const categoriesObj = arrayToObject(categoriesArr);
    const total = expenses.reduce((acc, item) => acc + item.amount, 0);
    const expensesObj = groupByCategory(expenses, 'categoryId');
    const data = Object.entries(expensesObj).map(([category, expenses]) => {
        return {
            name: categoriesObj[category].name,
            color: categoriesObj[category].color,
            value: (expenses as []).reduce(
                (acc: number, item: any) => acc + item.amount,
                0
            ),
        };
    });
    return (
        <div className="diagramm">
            <div className="diagramm-total">{total} byn</div>
            <ResponsiveContainer>
                <PieChart width={350} height={250}>
                    <Pie
                        data={data}
                        cx={'50%'}
                        cy={'50%'}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={1}
                        dataKey="value"
                        label
                    >
                        {data.map((item, index) => (
                            <Cell key={`cell-${index}`} fill={item.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
