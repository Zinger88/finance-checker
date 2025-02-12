import { icons } from '../../icons';

export const Category = ({
    title,
    summ,
    total,
    color,
    icon,
}: {
    title: string;
    summ: number;
    total: number;
    color: string;
    icon: string;
}) => {
    const percent = Math.round((summ / total) * 100);
    return (
        <div className="category">
            <div className="category-title">{title}</div>
            <div
                className="category-icon"
                style={{ background: color || 'beige' }}
            >
                {icons[icon || 'heart']}
            </div>
            <div className="category-summ">
                {summ} byn{' '}
                <span className="category-percent">({percent}%)</span>
            </div>
        </div>
    );
};
