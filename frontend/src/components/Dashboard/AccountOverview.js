import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthorizedContext } from '../../context/AuthContext';
import { useAccountsContext } from '../../context/AccountsContext';
import LinkButton from '../Buttons/LinkButton';
import { auth } from '../../lib/firebase';
import TransactionsModule from './TransactionsModule';
import { AccountsList } from './AccountsList';

//! Regression imports
import { calculateRegression, prepareData } from '../../lib/helpers';

export const AccountOverview = () => {
  const { accessToken, linkToken, linkTokenResError } = useAuthorizedContext();
  const { accounts, setAccounts, transactions, setTransactions, loadingTransactions, setLoadingTransactions } =
    useAccountsContext();

  const [selectedAccount, setSelectedAccount] = useState(null);

  //! Regression data
  const [regressionData, setRegressionData] = useState(null);

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

  const getTransactions = async (account_id = null) => {
    setLoadingTransactions('loading');
    const user = auth.currentUser;
    const token = user && (await user.getIdToken());

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    // Date format is YYYY-MM-DD
    const body = {
      access_token: accessToken.access_token,
      account_id: account_id,
    };

    axios
      .post('http://localhost:8080/api/transactions/get', JSON.stringify(body), config)
      .then((res) => {
        setTransactions(res.data.transactions);
        const formattedData = prepareData(res.data.transactions.transactions);
        setRegressionData(calculateRegression(formattedData));
        setLoadingTransactions('done');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (accessToken.access_token && !accounts) {
      getAccounts();
    }
    if (accounts) {
      getTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, accounts]);

  console.log(`accounts >>>`, accounts);
  console.log(`transactions >>>`, transactions);

  return (
    <div className='overviewDiv'>
      <h2 sx={{ fontSize: '5px' }}>Account Overview</h2>
      <div className='wrapper'>
        {accounts && <AccountsList accounts={accounts} setSelectedAccount={setSelectedAccount} />}
      </div>
      <TransactionsModule
        loadingTransactions={loadingTransactions}
        selectedAccount={selectedAccount}
        transactions={transactions}
        getTransactions={getTransactions}
      />
      {linkToken !== null && <LinkButton linkToken={linkToken}></LinkButton>}
      <div>{linkTokenResError && `${linkTokenResError}`}</div>
    </div>
  );
};
