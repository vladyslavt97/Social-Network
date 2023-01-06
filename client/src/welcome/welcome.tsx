import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Registration } from './registration/registration';
import { Logo } from '../components/logo';
import { Login } from './login/login';
import { Reset } from './reset/resetpwd';

export function Welcome() {
    return <div id="welcome">
            <h1 className='welcome'>Welcome to Bookface!</h1>
            <Logo />
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Registration />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/reset" element={<Reset />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
}

