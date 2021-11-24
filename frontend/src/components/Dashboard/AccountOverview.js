import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAxiosWithAuth } from '../../lib/hooks';
import LinkButton from '../Buttons/LinkButton';
import { auth } from '../../lib/firebase';
import { TransactionsList } from './Transactions';
import { AccountsList } from './AccountsList';

export const AccountOverview = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [accessToken, setAccessToken] = useState({});
  const {
    response: linkTokenRes,
    status: linkTokenResStatus,
    error: linkTokenResError,
  } = useAxiosWithAuth({ endpoint: 'create-link-token', method: 'post' });

  useEffect(() => {
    if (linkTokenRes !== null) {
      setLinkToken(linkTokenRes.link_token);
    }
  }, [linkTokenRes]);

  const getAccounts = async () => {
    const user = auth.currentUser;
    const token = user && (await user.getIdToken());

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = {
      access_token: accessToken.access_token,
    };

    axios
      .post('http://localhost:8080/api/accounts/get', JSON.stringify(body), config)
      .then((res) => setAccounts(res.data.accounts));
  };

  const getTransactions = async () => {
    const user = auth.currentUser;
    const token = user && (await user.getIdToken());

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const body = {
      access_token: accessToken.access_token,
    };

    axios
      .post('http://localhost:8080/api/transactions/get', JSON.stringify(body), config)
      .then((res) => setTransactions(res.data.transactions));
  };

  useEffect(() => {
    if (accessToken.access_token) {
      getAccounts();
      getTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  console.log(`accounts >>>`, accounts);
  console.log(`transactions >>>`, transactions);

  return (
    <div className='overviewDiv'>
      <h2 sx={{ fontSize: '5px' }}>Account Overview</h2>
      <div className='wrapper'>{accounts && <AccountsList accounts={accounts} />}</div>
      <h2 sx={{ fontSize: '5px' }}>Transaction History</h2>
      {transactions && <TransactionsList transactions={transactions.transactions} />}
      {/* <div>{accessToken && `${accessToken?.access_token}`}</div>
      <div>{linkToken !== null ? `${linkToken}` : `${linkTokenResStatus}`}</div> */}
      {linkToken !== null && <LinkButton linkToken={linkToken} setAccessToken={setAccessToken}></LinkButton>}
      <div>{linkTokenResError && `${linkTokenResError}`}</div>
    </div>
  );
};
