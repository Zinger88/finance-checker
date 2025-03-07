import { ReactElement } from 'react';

export const Container = ({ children }: { children: ReactElement }) => {
    return (
        <div
            style={{
                maxWidth: '500px',
                padding: '0 10px',
                margin: '0 auto',
                width: '100%',
            }}
        >
            {children}
        </div>
    );
};
