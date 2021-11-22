import { useEffect, useState } from 'react';
import { useAxiosWithAuth } from '../lib/hooks';
import LinkButton from './LinkButton';

export const AccountOverview = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [accessToken, setAccessToken] = useState({});
  const { response, status, error } = useAxiosWithAuth({ endpoint: 'create-link-token', method: 'post' });

  useEffect(() => {
    if (response !== null) {
      setLinkToken(response.link_token);
    }
  }, [response]);

  return (
    <div className='overviewDiv'>
      <h2 sx={{ fontSize: '5px' }}>Account Overview</h2>
      <div>{accessToken && `${accessToken?.accessToken}`}</div>
      <div>{linkToken !== null ? `${linkToken}` : `${status}`}</div>
      {linkToken !== null && <LinkButton linkToken={linkToken} setAccessToken={setAccessToken}></LinkButton>}
      <div>{error && `${error}`}</div>
    </div>
  );
};
