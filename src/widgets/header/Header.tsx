import { Button, ButtonProps } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { styled } from '@mui/material/styles';
import { logOutUser } from '../../controllers/users.ts';
import { userStore } from '../../store/userStore.ts';
import { Container } from '../../shared/ui/container/Container.tsx';

import './styles.scss';

const ColorButton = styled(Button)<ButtonProps>(() => ({
    backgroundColor: 'white',
    fontSize: '8px',
    padding: '5px',
    height: '25px',
    color: 'var(--main-color)',
    border: 'none',
    transition: '.5s',
    '&:hover': {
        transform: 'scale(1.1)',
        transition: '.5s',
    },
}));

export const Header = () => {
    const expenses = userStore((state) => state.expenses);
    const totalExpenses = expenses.reduce((acc, item) => {
        return acc + item.amount;
    }, 0);
    const setUser = userStore((state) => state.setUser);
    const userData = userStore((state) => state.user);
    const logoutHandler = () => {
        logOutUser();
        setUser(null);
    };
    return (
        <div className="head">
            <Container>
                {userData ? (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <div className="head-title">Итого потрачено:</div>
                            <div className="head-summ">
                                {totalExpenses} <span>byn</span>
                            </div>
                        </div>
                        <div className="head-right">
                            <div className="head-user">
                                <AccountBoxIcon />
                            </div>
                            <ColorButton
                                variant="outlined"
                                onClick={logoutHandler}
                            >
                                Выйти
                            </ColorButton>
                        </div>
                    </div>
                ) : (
                    <span>Войдите в аккаунт</span>
                )}
            </Container>
        </div>
    );
};
