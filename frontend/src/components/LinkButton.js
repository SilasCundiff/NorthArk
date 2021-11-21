import { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import { useAuthorizedContext } from '../context/AuthContext';

const LinkButton = () => {
  const { linkToken } = useAuthorizedContext();

  const onSuccess = useCallback((public_token, metadata) => {
    const res = axios.post('/api/set_access_token', JSON.stringify({ public_token }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, []);

  const { open, ready } = usePlaidLink({ token: linkToken, onSuccess });

  return (
    <>
      {linkToken ? (
        <button onClick={() => open()} disabled={!ready}>
          Link account
        </button>
      ) : null}
    </>
  );
};

export default LinkButton;
