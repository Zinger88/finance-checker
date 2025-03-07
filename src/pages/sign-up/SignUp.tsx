import { Button, TextField } from '@mui/material';
import { signUpUser } from '../../controllers/users.ts';
import { useNavigate } from 'react-router';
import { SignUpErrorEnum } from '../../shared/constants.ts';

export const SignUp = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const email = form.email.value;

        const password = form.password.value;
        const name = form.displayName.value;

        const result = await signUpUser(email, password, name);
        if (result.error === SignUpErrorEnum.ALREADY_EXIST) {
            navigate('/sign-in');
        }
        navigate('/sign-in');
    };
    return (
        <div className="sign-up">
            <h1>Зарегистрируйтесь</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    type={'email'}
                    placeholder={'Email address'}
                    name={'email'}
                    label={'Email address'}
                    required={true}
                />
                <TextField
                    type={'password'}
                    placeholder={'Password'}
                    name={'password'}
                    label={'Password'}
                    required={true}
                />
                <TextField
                    type={'text'}
                    placeholder={'Your Name'}
                    name={'displayName'}
                    label={'Display Name'}
                />

                <Button variant={'outlined'} type="submit">
                    Зарегистрироваться
                </Button>
            </form>
        </div>
    );
};
