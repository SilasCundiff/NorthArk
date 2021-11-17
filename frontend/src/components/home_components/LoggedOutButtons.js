import LoginButton from '../LoginButton';
import RegisterButton from '../RegisterButton';

export const LoggedOutButtons = () => {
    return(
        <div className='jumboButtons d-flex justify-content-center'>
            <LoginButton />
            <RegisterButton />
        </div>
    )
}