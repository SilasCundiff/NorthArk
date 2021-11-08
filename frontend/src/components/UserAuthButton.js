import { useAuthorizedContext } from '../context/AuthContext';
import { useSignInWithGoogle, useSignOutUser } from '../lib/hooks';
import Button from '@mui/material/Button';

const UserAuthButton = () => {
  const { user } = useAuthorizedContext();
  return (
    <div>
      {!user && (
        <Button variant='contained' onClick={useSignInWithGoogle}>
          Login
        </Button>
      )}
      {user && (
        <Button variant='contained' onClick={useSignOutUser}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default UserAuthButton;
