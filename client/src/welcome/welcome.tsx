import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Registration } from './registration/registration';
import { Logo } from '../components/logo';
import { Login } from './login/login';

export function Welcome() {
    return <div id="welcome">
            <h1>Welcome!</h1>
            <Logo />
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Registration />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
}

