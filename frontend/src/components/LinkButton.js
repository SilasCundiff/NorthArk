import { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import Button from '@mui/material/Button';
import { auth } from '../utils/firebase';

const LinkButton = ({ linkToken, setAccessToken }) => {
  const onSuccess = useCallback(
    async (public_token) => {
      const user = auth.currentUser;
      const token = user && (await user.getIdToken());

      const response = await fetch('http://localhost:8080/api/set_access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ public_token }),
      });

      if (!response.ok) {
        setAccessToken({
          itemId: `no item_id retrieved`,
          accessToken: `no access_token retrieved`,
          isItemAccess: false,
        });
        return;
      } else {
        const data = await response.json();
        setAccessToken({
          itemId: data.item_id,
          accessToken: data.access_token,
          isItemAccess: true,
        });
      }
    },
    [setAccessToken]
  );

  const config = {
    token: linkToken,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button variant='outlined' onClick={() => open()} disabled={!ready}>
      Link an account
    </Button>
  );
};

export default LinkButton;
