import { icons } from '../../icons.tsx';
import './styles.scss';

export const Category = ({
    title,
    summ,
    total,
    color,
    icon,
}: {
    title: string;
    summ?: number;
    total?: number;
    color: string;
    icon: string;
}) => {
    const percent = summ && total ? Math.round((summ / total) * 100) : null;
    return (
        <div className="category">
            <div className="category-title">{title}</div>
            <div
                className="category-icon"
                style={{ background: color || 'beige' }}
            >
                {icons[icon || 'heart']}
            </div>
            {summ && summ > 0 && percent && (
                <div className="category-summ">
                    {summ} byn{' '}
                    <span className="category-percent">{percent}%</span>
                </div>
            )}
        </div>
    );
};
