//import TextField from "@mui/material/TextField";
import './App.scss';
//import { Diagramm } from './components/diagramm/Diagramm';
//import Button from "@mui/material/Button";
import { Head } from './components/head/Head';
import { SignUp } from './components/sign-up/SignUp';
import { SignIn } from './components/sign-in/SignIn';
import { BrowserRouter, Routes, Route } from 'react-router';
import { MainPage } from './components/main-page/MainPage';
import { AuthChecker } from './components/auth-checker/AuthChecker';

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthChecker>
                    <div className="main">
                        <Head />
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
