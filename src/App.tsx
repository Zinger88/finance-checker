import './App.scss';
import { Header } from './widgets/header/Header.tsx';
import { SignUp } from './pages/sign-up/SignUp';
import { SignIn } from './pages/sign-in/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router';
import { MainPage } from './pages/main-page/MainPage';
import { AuthChecker } from './app/auth-checker/AuthChecker';

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthChecker>
                    <div className="main">
                        <Header />
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/sign-in" element={<SignIn />} />
                            <Route path="/sign-up" element={<SignUp />} />
                        </Routes>
                    </div>
                </AuthChecker>
            </BrowserRouter>
        </>
    );
}

export default App;
