import { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import Button from '@mui/material/Button';
import { auth } from '../../lib/firebase';

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
          item_id: `no item_id retrieved`,
          access_token: `no access_token retrieved`,
          request_id: '',
        });
        return;
      } else {
        const data = await response.json();
        setAccessToken({
          item_id: data.item_id,
          access_token: data.access_token,
          request_id: data.request_id,
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
    <Button sx={{ marginTop: '20px' }} variant='contained' onClick={() => open()} disabled={!ready}>
      Link an account
    </Button>
  );
};

export default LinkButton;
