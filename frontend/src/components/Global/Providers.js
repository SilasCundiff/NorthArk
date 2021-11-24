import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { AuthorizedProvider } from '../../context/AuthContext';
import { ColorModeProvider } from '../../context/ColorModeContext';
import { useTheme } from '../../lib/hooks';
import { auth } from '../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Providers = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [mode, setMode] = useState('dark');

  const theme = useTheme(mode);

  return (
    <AuthorizedProvider value={{ user, loading, error }}>
      <ColorModeProvider setMode={setMode}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </ColorModeProvider>
    </AuthorizedProvider>
  );
};

export default Providers;
