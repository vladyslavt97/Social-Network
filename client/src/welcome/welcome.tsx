import { Registration } from './registration/registration';
import { Logo } from '../components/logo';

export function Welcome() {
    return <div>
        <Registration />
        {/* <Login /> - will come later */}
    </div>
}