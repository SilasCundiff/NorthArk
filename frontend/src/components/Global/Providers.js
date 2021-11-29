import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { AuthorizedProvider } from '../../context/AuthContext';
import { AccountsProvider } from '../../context/AccountsContext';
import { ColorModeProvider } from '../../context/ColorModeContext';
import { useTheme, useAxiosWithAuth } from '../../lib/hooks';
import { auth } from '../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Providers = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [mode, setMode] = useState('dark');
  const [linkToken, setLinkToken] = useState(null);
  const [accessToken, setAccessToken] = useState({});
  const [accounts, setAccounts] = useState(null);

  const [transactions, setTransactions] = useState(null);

  const [loadingTransactions, setLoadingTransactions] = useState('initial');
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

  const theme = useTheme(mode);
  const authValues = {
    user,
    loading,
    error,
    linkToken,
    linkTokenRes,
    linkTokenResError,
    linkTokenResStatus,
    accessToken,
    setAccessToken,
  };

  const accountValues = {
    accounts,
    setAccounts,
    transactions,
    setTransactions,
    loadingTransactions,
    setLoadingTransactions,
  };

  return (
    <AuthorizedProvider value={authValues}>
      <ColorModeProvider setMode={setMode}>
        <AccountsProvider value={accountValues}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>{children}</BrowserRouter>
          </ThemeProvider>
        </AccountsProvider>
      </ColorModeProvider>
    </AuthorizedProvider>
  );
};

export default Providers;
