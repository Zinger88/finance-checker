import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { userStore } from '../../store/userStore.ts';
import { arrayToObject, groupByCategory } from '../../shared/utils.ts';

export const Diagramm = () => {
    const expenses = userStore((store) => store.expenses);
    const userSettings = userStore((store) => store.userSettings);
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
            <div className="diagramm-total">
                {total} {userSettings?.currency}
            </div>
            <ResponsiveContainer>
                <PieChart width={300} height={150}>
                    <Pie
                        data={data}
                        cx={'50%'}
                        cy={'50%'}
                        innerRadius={40}
                        outerRadius={60}
                        fill="#8884d8"
                        paddingAngle={1}
                        dataKey="value"
                        //label
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
