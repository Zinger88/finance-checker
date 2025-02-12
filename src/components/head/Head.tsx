import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { logOutUser } from '../../controllers/users';
import { userStore } from '../../store/userStore';
import { Container } from '../container/Container';

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

export const Head = () => {
    const expenses = userStore((state) => state.expenses);
    const totalExpenses = expenses.reduce((acc, item) => {
        return acc + item.amount;
    }, 0);
    const userData = userStore((state) => state.user);
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

                        <ColorButton
                            variant="outlined"
                            onClick={() => logOutUser()}
                        >
                            Выйти
                        </ColorButton>
                    </div>
                ) : (
                    <span>Войдите в аккаунт</span>
                )}
            </Container>
        </div>
    );
};
