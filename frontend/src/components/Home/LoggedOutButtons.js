import LoginButton from '../Buttons/LoginButton';
import RegisterButton from '../Buttons/RegisterButton';

export const LoggedOutButtons = () => {
  return (
    <div className='jumboButtons d-flex justify-content-center'>
      <LoginButton />
      <RegisterButton />
    </div>
  );
};
