import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { AuthorizedProvider } from '../../context/AuthContext';
import { ColorModeProvider } from '../../context/ColorModeContext';
import { useTheme, useAxiosWithAuth } from '../../lib/hooks';
import { auth } from '../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Providers = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [mode, setMode] = useState('dark');
  const [linkToken, setLinkToken] = useState(null);
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

  const theme = useTheme(mode);

  return (
    <AuthorizedProvider
      value={{ user, loading, error, linkToken, linkTokenRes, linkTokenResError, accessToken, setAccessToken }}
    >
      <ColorModeProvider setMode={setMode}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </ColorModeProvider>
    </AuthorizedProvider>
  );
};

export default Providers;
