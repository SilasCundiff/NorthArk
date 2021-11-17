import { useAuthorizedContext } from '../../context/AuthContext';
import FullLogo from '../../assets/NorthArk_TypeLogo.png';
import { LoggedInButtons } from './LoggedInButtons';
import { LoggedOutButtons } from './LoggedOutButtons';

const Jumbotron = () => {
    const { user } = useAuthorizedContext();
    return (
        <div className='jumbotron d-flex flex-column justify-content-center'>
            <img className='heroLogo' src={FullLogo} alt='NorthArk Full Logo' />
            <p className='heroText text-center font-weight-bold'>No.1 in banking since 1843</p>
            {user ? <LoggedInButtons /> : <LoggedOutButtons />}
        </div>
    )
}

export default Jumbotron;