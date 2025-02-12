import { Button, TextField } from '@mui/material';
import { signInUser } from '../../controllers/users';
import { useNavigate } from 'react-router';

export const SignIn = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;

        const user = await signInUser(email, password);
        if ((user as any)?.uid) {
            navigate('/');
        }
    };
    const toSignUp = () => {
        navigate('/sign-up');
    };
    return (
        <div className="sign-up">
            <h1>Вход в аккаунт</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    type={'email'}
                    placeholder={'Email'}
                    name={'email'}
                    label={'Email'}
                    required
                />
                <TextField
                    type={'password'}
                    placeholder={'Password'}
                    name={'password'}
                    label={'Password'}
                />
                <Button variant="outlined" type="submit">
                    Войти
                </Button>
                <Button onClick={toSignUp}>Зарегистрироваться</Button>
            </form>
        </div>
    );
};
